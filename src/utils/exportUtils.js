import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportLeads = (data, format, keyword, viewMode) => {
  if (!data.length) return;

  const fileName = viewMode === 'shortlist' ? 'trueview_shortlisted_leads' : `trueview_leads_${keyword}`;

  try {
    if (format === 'csv') {
      const dataStr = "Company,Phone,Email,Location,Source\n"
        + data.map(l => `"${l.company}","${l.phone}","${l.email}","${l.location}","${l.source}"`).join("\n");
      downloadFile(dataStr, `${fileName}.csv`, 'text/csv;charset=utf-8;');
    } 
    else if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      downloadFile(dataStr, `${fileName}.json`, 'application/json;charset=utf-8;');
    } 
    else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`Trueview Strategic Leads: ${viewMode === 'shortlist' ? 'SHORTLIST' : keyword.toUpperCase()}`, 14, 20);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()} | Strategic Lead Portal`, 14, 28);
      
      const tableColumn = ["Company Name", "Phone", "Email", "Location", "Source"];
      const tableRows = data.map(l => [l.company, l.phone, l.email, l.location, l.source]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [99, 102, 241] }
      });
      doc.save(`${fileName}.pdf`);
    } 
    else if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Trueview Leads");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed. Please check the console for details.");
  }
};

const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
