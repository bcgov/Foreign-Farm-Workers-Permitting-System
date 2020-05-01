import pdfMake from 'pdfmake/build/pdfmake';
import html2canvas from 'html2canvas';

const isCanvasBlank = (canvas) => {
  const context = canvas.getContext('2d');

  let blockSize = 10; // only visit every 10 pixels
  let data;
  let defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  let i = -4;
  let rgb = { r: 0, g: 0, b: 0 };
  let count = 0;

  try {
    data = context.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  const length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb.r === 255 && rgb.g === 255 && rgb.b === 255;
}

export const convertElementToPDF = async (element, fileName) => {
  try {
    const content = [];
    const pageWidth = 950;
    const pageHeight = 1400;

    // html2canvas needs this workaround in order to render svg on Chrome 
    var svgElements = element.querySelectorAll('svg');
    svgElements.forEach((item) => {
      item.setAttribute("width", item.getBoundingClientRect().width);
      item.style.width = null;
    });

    const childCount = element.getElementsByTagName('*').length;
    const elementHeight = childCount * 8.5;
    const pageNumber = Math.ceil(elementHeight / pageHeight);

    for (let i = 0; i < pageNumber; i++) {
      const canvas = await html2canvas(element, {
        y: pageHeight * i,
        width: pageWidth,
        windowWidth: pageWidth,
        height: pageHeight,
        windowHeight: elementHeight,
      });

      if (!isCanvasBlank(canvas)) {
        content.push({
          image: canvas.toDataURL(),
          width: 500,
        })
      }
    }

    if (fileName) {
      pdfMake.createPdf({ content }).download(fileName);
    } else {
      pdfMake.createPdf({ content }).open();
    }
  } catch (e) {
    throw (e);
  }
};

