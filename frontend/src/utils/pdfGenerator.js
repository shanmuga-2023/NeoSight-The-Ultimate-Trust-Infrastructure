import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateForensicPDF = async (reportRef) => {
  if (!reportRef.current) return;

  try {
    // Capture the hidden React Component as a high-quality Image Canvas
    const canvas = await html2canvas(reportRef.current, {
      scale: 2, // High resolution
      useCORS: true, // Allow cross-origin images (important for URL.createObjectURL)
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Initialize jsPDF in Portrait mode, A4 physical paper size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Plop the structural image perfectly onto the A4 page
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Trigger browser download
    pdf.save('NeoSight_Forensic_Report.pdf');
    
    return true;
  } catch (error) {
    console.error("Failed to generate structural PDF", error);
    return false;
  }
};
