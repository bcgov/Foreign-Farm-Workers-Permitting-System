import pdfMake from 'pdfmake/build/pdfmake';
import html2canvas from 'html2canvas';

export const convertElementToPDF = async (element, fileName, filter = () => true) => {
  try {
    const canvas0 = await html2canvas(element, {
      y: 0,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight,
    });

    const canvas1 = await html2canvas(element, {
      y: (window.outerHeight + window.innerHeight) * 1,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight,
    });

    const canvas2 = await html2canvas(element, {
      y: (window.outerHeight + window.innerHeight) * 2,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight,
    });

    const docDefinition = {
      content: [{
        image: canvas0.toDataURL(),
        width: 500,
      },
      {
        image: canvas1.toDataURL(),
        width: 500,
      },
      {
        image: canvas2.toDataURL(),
        width: 500,
      }]
    };
    pdfMake.createPdf(docDefinition).download(fileName);
  } catch (e) {
    throw (e);
  }
};

