import { jsPDF } from 'jspdf';
import { PRODUCTS, MILL_INFO } from '../data/millData';

export const generateCatalogPDF = async (): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Primary brand colors
  const primaryGreen = [7, 26, 16]; // #071a10
  const emeraldAccent = [27, 67, 50]; // #1B4332
  const goldAccent = [212, 175, 55]; // #D4AF37
  const goldLight = [245, 235, 200];
  const textDark = [30, 41, 59]; // slate-800
  const textMuted = [100, 116, 139]; // slate-500

  const drawHeaderBar = (title: string, subtitle?: string) => {
    // Top banner strip
    doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Gold accent separator line
    doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.rect(0, 28, pageWidth, 1.5, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('SANDRANA RICE MILLS', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.text('PREMIUM PUNJAB RICE PROCESSORS & EXPORTERS', margin, 18);

    doc.setFontSize(7.5);
    doc.setTextColor(220, 220, 220);
    doc.text(
      `28 KM Jhang–Sargodha Road, Punjab, Pakistan • Direct: ${MILL_INFO.phone} • ${MILL_INFO.email}`,
      margin,
      24
    );

    // Right side badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.text('CATALOG 2026', pageWidth - margin, 14, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(200, 200, 200);
    doc.text('DOC: SRM-CAT-2026', pageWidth - margin, 20, { align: 'right' });
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    const y = pageHeight - 10;
    // Bottom gold line
    doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.rect(margin, y - 4, contentWidth, 0.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      'Sandrana Rice Mills (Pvt) Ltd • ISO & Standard Quality Tested • All varieties subject to seasonal inspection',
      margin,
      y
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, y, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: TITLE, OVERVIEW & SUMMARY SPEC TABLE
  // ==========================================
  drawHeaderBar('Sandrana Rice Mills Product Catalog');

  let currentY = 38;

  // Document Heading Banner
  doc.setFillColor(245, 248, 245);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
  doc.text('OFFICIAL CERTIFIED RICE PRODUCT CATALOG', margin + 6, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(
    'Precision milled, multi-stage polished, and optically color-sorted rice varieties cultivated in Punjab.',
    margin + 6,
    currentY + 14
  );
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    'Standard export packaging: 10kg, 25kg, 50kg PP woven bags and custom distributor branded sacks.',
    margin + 6,
    currentY + 20
  );

  currentY += 30;

  // Section Heading: Executive Technical Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
  doc.text('1. VARIETY SPECIFICATIONS & LABORATORY MATRIX', margin, currentY);

  // Decorative gold underline
  doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.rect(margin, currentY + 2, 50, 0.8, 'F');

  currentY += 8;

  // Table Column Definitions
  const colWidths = [42, 28, 28, 26, 26, 32];
  const colX = [
    margin,
    margin + colWidths[0],
    margin + colWidths[0] + colWidths[1],
    margin + colWidths[0] + colWidths[1] + colWidths[2],
    margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3],
    margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4],
  ];

  // Table Header Row
  doc.setFillColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
  doc.rect(margin, currentY, contentWidth, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);

  doc.text('Variety / Commercial Name', colX[0] + 2, currentY + 5);
  doc.text('Avg Length', colX[1] + 2, currentY + 5);
  doc.text('Moisture Max', colX[2] + 2, currentY + 5);
  doc.text('Broken Max', colX[3] + 2, currentY + 5);
  doc.text('Purity Min', colX[4] + 2, currentY + 5);
  doc.text('Primary Application', colX[5] + 2, currentY + 5);

  currentY += 7.5;

  // Table Rows
  PRODUCTS.forEach((p, idx) => {
    const rowHeight = 7.5;
    const isAlt = idx % 2 === 1;

    if (isAlt) {
      doc.setFillColor(248, 250, 248);
      doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
    }

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(p.name, colX[0] + 2, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);

    doc.text(p.grainLength.split(' ')[0] + ' mm', colX[1] + 2, currentY + 5);
    doc.text(p.moistureContent, colX[2] + 2, currentY + 5);
    doc.text(p.brokenGrains, colX[3] + 2, currentY + 5);
    doc.text(p.purity, colX[4] + 2, currentY + 5);

    // Short application label
    const appLabel =
      p.category === 'kaynat'
        ? 'Biryani & Commercial'
        : p.category === 'basmati'
        ? 'Aromatic / Fine Dining'
        : p.category === 'long-grain'
        ? 'Daily Culinary / Retail'
        : 'Foodservice / Catering';
    doc.text(appLabel, colX[5] + 2, currentY + 5);

    currentY += rowHeight;
  });

  currentY += 12;

  // Processing & Optical Sorting Guarantees Box
  doc.setFillColor(254, 252, 243);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin, currentY, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('SANDRANA MILLING & QUALITY ASSURANCE PROTOCOL', margin + 6, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  const qualityPoints = [
    '• Computerized Optical Color Sorters: Detects and rejects discolored, red-striped, or chalky grains.',
    '• Multi-Stage Silky Water Polishers: Imparts high natural sheen without degrading kernel integrity.',
    '• Multi-Deck Rotary Pre-Cleaners: Removes all stones, chaff, dust, and immature paddy before de-husking.',
    '• Continuous Moisture Monitoring: Dried uniformly to ensure prolonged storage without fermentation.',
    '• Third-Party Inspection Ready: Fully compliant with pre-shipment SGS / PCSIR testing protocols.',
  ];

  let qY = currentY + 13;
  qualityPoints.forEach((pt) => {
    doc.text(pt, margin + 6, qY);
    qY += 4.8;
  });

  currentY += 46;

  // Packaging Standards Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
  doc.text('EXPORT & WHOLESALE PACKAGING CONFIGURATIONS', margin, currentY);
  currentY += 5;

  const pkgBoxes = [
    { title: 'Standard PP Bags', desc: '25kg & 50kg Polypropylene bags with inner liner.' },
    { title: 'Retail Canvas & Jute', desc: '5kg, 10kg & 20kg printed cotton & master jute bags.' },
    { title: 'OEM Private Label', desc: 'Custom bag artwork, barcode, and distributor branding.' },
  ];

  const boxW = (contentWidth - 6) / 3;
  pkgBoxes.forEach((bx, idx) => {
    const bX = margin + idx * (boxW + 3);
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 225, 230);
    doc.roundedRect(bX, currentY, boxW, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
    doc.text(bx.title, bX + 3, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(doc.splitTextToSize(bx.desc, boxW - 6), bX + 3, currentY + 11);
  });

  drawFooter(1, 2);

  // ==========================================
  // PAGE 2: DETAILED VARIETY PROFILES
  // ==========================================
  doc.addPage();
  drawHeaderBar('Detailed Variety Dossiers & Commercial Inquiries');

  currentY = 36;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
  doc.text('2. DETAILED CULINARY & PHYSICAL VARIETY DOSSIERS', margin, currentY);

  doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.rect(margin, currentY + 2, 55, 0.8, 'F');

  currentY += 8;

  // Render individual product cards (3 per page or formatted nicely)
  PRODUCTS.forEach((product, idx) => {
    // 35mm card height
    const cardH = 34;

    doc.setFillColor(idx % 2 === 0 ? 252 : 255, idx % 2 === 0 ? 253 : 255, idx % 2 === 0 ? 252 : 255);
    doc.setDrawColor(215, 222, 218);
    doc.roundedRect(margin, currentY, contentWidth, cardH, 2, 2, 'FD');

    // Left accent pill
    doc.setFillColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
    doc.roundedRect(margin + 2, currentY + 2, 2.5, cardH - 4, 1, 1, 'F');

    // Title & Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
    doc.text(`${idx + 1}. ${product.name}`, margin + 8, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.text(`[${product.category.toUpperCase()}] • ${product.subheading}`, margin + 8, currentY + 10.5);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const splitDesc = doc.splitTextToSize(product.description, contentWidth - 68);
    doc.text(splitDesc, margin + 8, currentY + 15);

    // Right Specs Box
    const specBoxX = pageWidth - margin - 56;
    doc.setFillColor(245, 248, 245);
    doc.setDrawColor(220, 230, 225);
    doc.roundedRect(specBoxX, currentY + 3, 52, 28, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
    doc.text('LABORATORY METRICS', specBoxX + 3, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Grain Length: ${product.grainLength}`, specBoxX + 3, currentY + 12);
    doc.text(`Moisture: ${product.moistureContent}`, specBoxX + 3, currentY + 16);
    doc.text(`Broken Grains: ${product.brokenGrains}`, specBoxX + 3, currentY + 20);
    doc.text(`Purity: ${product.purity}`, specBoxX + 3, currentY + 24);
    doc.text(`Color: ${product.color}`, specBoxX + 3, currentY + 28);

    // Ideal use tag below description
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(emeraldAccent[0], emeraldAccent[1], emeraldAccent[2]);
    doc.text('Recommended Use: ', margin + 8, currentY + 30);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(product.idealUse, margin + 35, currentY + 30);

    currentY += cardH + 4;
  });

  currentY += 4;

  // Bottom Commercial Inquiries Box
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.text('COMMERCIAL PROCUREMENT & SAMPLE REQUESTS', margin + 6, currentY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    'For wholesale container price quotes (FOB Karachi / CFR Worldwide), grain sample couriers, or mill visits:',
    margin + 6,
    currentY + 12
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text(
    `Direct Cell: ${MILL_INFO.phone} • WhatsApp: +${MILL_INFO.whatsappRaw} • Email: ${MILL_INFO.email}`,
    margin + 6,
    currentY + 17.5
  );

  drawFooter(2, 2);

  // Trigger browser download
  doc.save('Sandrana_Rice_Mills_Catalog_2026.pdf');
};
