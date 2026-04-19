export const generateElaOverlay = (imageFile) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      // Scale down large images to prevent browser freezing
      const MAX_WIDTH = 800;
      let width = img.width;
      let height = img.height;
      
      if (width > MAX_WIDTH) {
        height = (MAX_WIDTH / width) * height;
        width = MAX_WIDTH;
      }

      // 1. Create Baseline Canvas
      const canvas1 = document.createElement('canvas');
      canvas1.width = width;
      canvas1.height = height;
      const ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
      ctx1.drawImage(img, 0, 0, width, height);

      // 2. Compress baseline down to JPEG
      const compressedDataUrl = canvas1.toDataURL('image/jpeg', 0.60); // 60% quality
      
      const compressedImg = new Image();
      compressedImg.onload = () => {
        // 3. Create Compressed Canvas
        const canvas2 = document.createElement('canvas');
        canvas2.width = width;
        canvas2.height = height;
        const ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
        ctx2.drawImage(compressedImg, 0, 0, width, height);

        // 4. Perform Error Level Analysis (Diff Math)
        const diffCanvas = document.createElement('canvas');
        diffCanvas.width = width;
        diffCanvas.height = height;
        const diffCtx = diffCanvas.getContext('2d');
        
        const origImageData = ctx1.getImageData(0, 0, width, height);
        const compImageData = ctx2.getImageData(0, 0, width, height);
        const diffImageData = diffCtx.createImageData(width, height);

        let maxDiff = 0;
        // Amplify factor isolates heavy edits
        const AMPLIFY = 15;

        for (let i = 0; i < origImageData.data.length; i += 4) {
          const diffR = Math.abs(origImageData.data[i] - compImageData.data[i]);
          const diffG = Math.abs(origImageData.data[i+1] - compImageData.data[i+1]);
          const diffB = Math.abs(origImageData.data[i+2] - compImageData.data[i+2]);
          
          const maxPixelDiff = Math.max(diffR, diffG, diffB);
          if (maxPixelDiff > maxDiff) maxDiff = maxPixelDiff;

          // Paint heavy discrepancies wildly bright, keep static regions dark
          diffImageData.data[i] = Math.min(diffR * AMPLIFY, 255);     // R (Red glow for error)
          diffImageData.data[i+1] = Math.min(diffG * AMPLIFY, 255);   // G
          diffImageData.data[i+2] = Math.min(diffB * AMPLIFY, 255);   // B
          diffImageData.data[i+3] = 255;                              // Alpha fully opaque
        }

        diffCtx.putImageData(diffImageData, 0, 0);
        
        // Return base64 overlay of the error mapping
        resolve(diffCanvas.toDataURL('image/png'));
      };
      
      compressedImg.onerror = reject;
      compressedImg.src = compressedDataUrl;
    };
    
    img.onerror = reject;
    img.src = url;
  });
};
