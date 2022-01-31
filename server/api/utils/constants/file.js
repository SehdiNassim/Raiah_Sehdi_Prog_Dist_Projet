const {getValuesArrayFromMap} = require("../../../core/helpers");

const PATH = 'uploads'

const acceptedFiles = {
  PDF : 'application/pdf',
  IMAGE_JPEG : 'image/jpeg',
  IMAGE_PNG : 'image/png',
  XLSX : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS : 'application/vnd.ms-excel'  
}

module.exports.path = PATH;

module.exports.acceptedFiles = acceptedFiles;
module.exports.acceptedFilesList = getValuesArrayFromMap(acceptedFiles);