const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const dirs = ['uploads/products', 'uploads/orders/documents', 'uploads/orders/shipments'];
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

// 文件过滤器
const imageFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('仅支持 JPG、PNG、WebP 格式的图片'), false);
  }
};

const documentFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg', 'image/png', 'image/webp',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('不支持的文件格式（支持 PDF/Word/Excel/图片）'), false);
  }
};

// 生成 UUID 文件名
function generateFileName(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const uuid = Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
  return uuid + ext;
}

// 产品图片上传
const productStorage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads/products'),
  filename: (req, file, cb) => cb(null, generateFileName(file.originalname)),
});

// 订单文档上传
const documentStorage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads/orders/documents'),
  filename: (req, file, cb) => cb(null, generateFileName(file.originalname)),
});

// 发货图片上传
const shipmentStorage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads/orders/shipments'),
  filename: (req, file, cb) => cb(null, generateFileName(file.originalname)),
});

const uploadProduct = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
});

const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFilter,
});

const uploadShipment = multer({
  storage: shipmentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFilter,
});

module.exports = { uploadProduct, uploadDocument, uploadShipment };
