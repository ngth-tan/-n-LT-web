/* common.js - dữ liệu mẫu tĩnh, header/footer có thanh tìm kiếm, Luxury Banner (không dùng CSDL/Storage) */
function $(id) { return document.getElementById(id); }
const DATA = {};
function read(k, d) { return DATA[k] === undefined ? d : JSON.parse(JSON.stringify(DATA[k])); }
function save() { /* Giao diện tĩnh - không lưu trữ dữ liệu */ }

function setupNumberFormatter(inputEl) {
	if (!inputEl) return;
	inputEl.addEventListener("input", function () {
		let value = this.value.replace(/\D/g, "");
		this.value = value ? Number(value).toLocaleString("en-US") : "";
	});
}
function getCleanNumber(inputEl) {
	if (!inputEl) return 0;
	return parseFloat(String(inputEl.value || "").replace(/,/g, "")) || 0;
}
function formatVND(n) {
	return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(n) || 0);
}
function norm(s) {
	return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().trim();
}

const CATEGORIES = ["Moto", "Xe máy điện", "Pickup", "SUV", "Phụ kiện", "Roadster", "Hypercar", "Sedan"];
const PRICE_RANGES = [
	{ value: "", label: "Tất cả khoảng giá" },
	{ value: "under-50m", label: "Dưới 50 Triệu VNĐ", test: (p) => p < 50000000 },
	{ value: "50m-1b", label: "50 Triệu - 1 Tỷ VNĐ", test: (p) => p >= 50000000 && p < 1000000000 },
	{ value: "1b-10b", label: "1 Tỷ - 10 Tỷ VNĐ", test: (p) => p >= 1000000000 && p <= 10000000000 },
	{ value: "over-10b", label: "Trên 10 Tỷ VNĐ", test: (p) => p > 10000000000 },
];
const ORDER_STATUS = ["Chưa xác nhận", "Đã xác nhận", "Đã giao (Thành công)", "Hủy đơn"];
const STATUS_FLOW = {
	"Chưa xác nhận": ["Đã xác nhận", "Hủy đơn"],
	"Đã xác nhận": ["Đã giao (Thành công)", "Hủy đơn"],
	"Đã giao (Thành công)": [],
	"Hủy đơn": [],
};

const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#1e293b"/><text x="50%" y="50%" fill="#d4af37" font-size="40" text-anchor="middle" font-family="Segoe UI">LUXURY AUTO</text></svg>'
);
document.addEventListener("error", function (e) {
	if (e.target && e.target.tagName === "IMG" && e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
}, true);

DATA.db_users = [
	{ id: 101, name: "Nguyễn Văn A", email: "anguyen@gmail.com", phone: "0901234567", password: "123456", addresses: ["123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh"], isLocked: false },
	{ id: 102, name: "Trần Nguyên Phúc", email: "phuctran@gmail.com", phone: "0918223344", password: "123456", addresses: ["12 Lê Lợi, Quận 1, TP. Hồ Chí Minh"], isLocked: false },
	{ id: 103, name: "Lê Thị B", email: "ble@gmail.com", phone: "0988123456", password: "123456", addresses: [], isLocked: true },
];
DATA.db_products = [
	{ id: 1, name: "Kawasaki KLX 150 BF", category: "Moto", price: 79000000, qty: 4, img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80", desc: "Mô tô cào cào địa hình chuyên dụng, động cơ 150cc mạnh mẽ.", isSold: false, hidden: false },
	{ id: 2, name: "VinFast Evo Grand Premia", category: "Xe máy điện", price: 27900000, qty: 8, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80", desc: "Động cơ tối đa 2.250W, tốc độ 70 km/h, quãng đường tới 262 km/sạc, cốp rộng 35 lít.", isSold: false, hidden: false },
	{ id: 3, name: "Ford Ranger Wildtrak 2.0L", category: "Pickup", price: 973000000, qty: 3, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", desc: "Siêu bán tải hạng sang, động cơ Bi-Turbo 2.0L, hệ dẫn động 4x4.", isSold: false, hidden: false },
	{ id: 4, name: "Ford Ranger Raptor", category: "Pickup", price: 1299000000, qty: 2, img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", desc: "Siêu bán tải hiệu suất cao, trang bị hệ thống treo Fox danh tiếng.", isSold: false, hidden: false },
	{ id: 5, name: "Jeep Wrangler Rubicon", category: "SUV", price: 3688000000, qty: 1, img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80", desc: "SUV địa hình biểu tượng, khả năng vượt đá và lội nước cực đỉnh.", isSold: false, hidden: false },
	{ id: 6, name: "Baga Nhôm Thế Hệ Mới Rhino", category: "Phụ kiện", price: 8500000, qty: 15, img: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80", desc: "Baga mui nhôm siêu nhẹ, sơn tĩnh điện bền bỉ, dễ dàng lắp đặt.", isSold: false, hidden: false },
	{ id: 7, name: "Kawasaki D-Tracker 150", category: "Moto", price: 79000000, qty: 6, img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80", desc: "Dòng xe Supermoto bánh lốp đường phố, thiết kế năng động.", isSold: false, hidden: false },
	{ id: 8, name: "Yamaha XTZ 125", category: "Moto", price: 45000000, qty: 5, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80", desc: "Xe cào cào đa địa hình Dual-sport bền bỉ, vận hành linh hoạt.", isSold: false, hidden: false },
	{ id: 9, name: "Honda XR150L", category: "Moto", price: 65000000, qty: 7, img: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=800&q=80", desc: "Moto cào cào đường trường, động cơ 150cc tiết kiệm.", isSold: false, hidden: false },
	{ id: 10, name: "Honda CRF150L", category: "Moto", price: 78000000, qty: 3, img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80", desc: "Cào cào địa hình chuyên nghiệp, trang bị phuộc USD cao cấp.", isSold: false, hidden: false },
	{ id: 11, name: "Velocity GT Roadster", category: "Roadster", price: 12500000000, qty: 0, img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", desc: "Động cơ V8 Bi-Turbo 4.0L, 650 Mã lực.", isSold: true, hidden: false },
	{ id: 12, name: "Phantom Hypercar Limited", category: "Hypercar", price: 35000000000, qty: 10, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", desc: "Phiên bản giới hạn 10 chiếc toàn cầu.", isSold: false, hidden: false },
	{ id: 13, name: "VinFast VF 9 Plus", category: "SUV", price: 1691000000, qty: 5, img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80", desc: "SUV điện full-size 7 chỗ, nội thất thương gia và tầm vận hành vượt trội.", isSold: false, hidden: false },
	{ id: 14, name: "Audi RS e-tron GT", category: "Sedan", price: 5900000000, qty: 2, img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80", desc: "Grand Tourer thuần điện hiệu năng cao, dẫn động bốn bánh toàn thời gian.", isSold: false, hidden: false },
	{ id: 15, name: "Mercedes-AMG G 63", category: "SUV", price: 11750000000, qty: 2, img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80", desc: "Biểu tượng SUV hiệu suất cao thủ công AMG, động cơ V8 4.0L Biturbo.", isSold: false, hidden: false },
	{ id: 16, name: "Mercedes-Maybach S 680", category: "Sedan", price: 15990000000, qty: 0, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80", desc: "Sedan siêu sang V12 đã bán hết và ẩn khỏi trang khách hàng.", isSold: true, hidden: true },
];
DATA.db_orders = [
	{ id: "ORD-1001", customerId: 102, customerName: "Trần Nguyên Phúc", customerEmail: "phuctran@gmail.com", phone: "0918223344", date: "2026-03-15", items: [{ id: 11, name: "Velocity GT Roadster", price: 12500000000, qty: 1 }], address: "12 Lê Lợi, Quận 1, TP. Hồ Chí Minh", paymentMethod: "Trực tuyến", total: 12500000000, status: "Đã giao (Thành công)" },
	{ id: "ORD-1002", customerId: 101, customerName: "Nguyễn Văn A", customerEmail: "anguyen@gmail.com", phone: "0901234567", date: "2026-05-20", items: [{ id: 3, name: "Ford Ranger Wildtrak 2.0L", price: 973000000, qty: 1 }], address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh", paymentMethod: "Tiền mặt", total: 973000000, status: "Đã xác nhận" },
	{ id: "ORD-1003", customerId: 101, customerName: "Nguyễn Văn A", customerEmail: "anguyen@gmail.com", phone: "0901234567", date: "2026-08-09", items: [{ id: 2, name: "VinFast Evo Grand Premia", price: 27900000, qty: 2 }], address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh", paymentMethod: "Trực tuyến", total: 55800000, status: "Chưa xác nhận" },
	{ id: "ORD-1004", customerId: 101, customerName: "Nguyễn Văn A", customerEmail: "anguyen@gmail.com", phone: "0901234567", date: "2026-07-01", items: [{ id: 1, name: "Kawasaki KLX 150 BF", price: 79000000, qty: 1 }], address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh", paymentMethod: "Trực tuyến", total: 79000000, status: "Đã giao (Thành công)" },
];
DATA.cart = [{ id: 3, name: "Ford Ranger Wildtrak 2.0L", price: 973000000, qty: 1 }];

function fillCategorySelect(selectEl, includeAll) {
	if (!selectEl) return;
	const current = selectEl.value;
	selectEl.innerHTML = includeAll ? '<option value="">Tất cả phân loại</option>' : "";
	CATEGORIES.forEach(function (c) { selectEl.innerHTML += '<option value="' + c + '">' + c + "</option>"; });
	if (current) selectEl.value = current;
}
function fillPriceSelect(selectEl) {
	if (!selectEl) return;
	selectEl.innerHTML = PRICE_RANGES.map(function (r) { return '<option value="' + r.value + '">' + r.label + "</option>"; }).join("");
}
function initProvinceAndDistrictSelectors(provId, distId) {
	const provSelect = document.getElementById(provId);
	const distSelect = document.getElementById(distId);
	if (!provSelect || !distSelect) return;
	const data = window.vietnamData || {};
	provSelect.innerHTML = '<option value="">-- Chọn Tỉnh / Thành phố --</option>';
	Object.keys(data).forEach(function (province) {
		provSelect.innerHTML += '<option value="' + province.replace(/"/g, "&quot;") + '">' + province + "</option>";
	});
	distSelect.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';
	provSelect.onchange = function () {
		const selectedProv = this.value;
		distSelect.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';
		(data[selectedProv] || []).forEach(function (dist) {
			distSelect.innerHTML += '<option value="' + String(dist).replace(/"/g, "&quot;") + '">' + dist + "</option>";
		});
	};
}
function allDistrictOptions() {
	const data = window.vietnamData || {};
	const list = [];
	Object.keys(data).forEach(function (p) { data[p].forEach(function (d) { list.push({ province: p, district: d }); }); });
	return list;
}
function invoiceHtml(o) {
	if (!o) return '<p style="color:#b91c1c;text-align:center;">Không tìm thấy hóa đơn.</p>';
	const items = (o.items || []).map(function (i) {
		return "<tr><td>" + i.name + "</td><td>" + (i.qty || 1) + "</td><td>" + formatVND(i.price) + "</td><td>" + formatVND((i.price || 0) * (i.qty || 1)) + "</td></tr>";
	}).join("");
	return (
		'<h3 style="color:var(--primary-color);border-bottom:2px solid var(--accent-color);padding-bottom:8px;">HÓA ĐƠN ' + o.id + "</h3>" +
		"<p><strong>Khách hàng:</strong> " + o.customerName + (o.customerEmail ? " (" + o.customerEmail + ")" : "") + "</p>" +
		"<p><strong>Số điện thoại:</strong> " + (o.phone || "") + "</p>" +
		"<p><strong>Ngày lập:</strong> " + o.date + "</p>" +
		"<p><strong>Địa chỉ giao:</strong> " + o.address + "</p>" +
		"<p><strong>Thanh toán:</strong> " + o.paymentMethod + "</p>" +
		"<p><strong>Trạng thái:</strong> " + o.status + "</p>" +
		'<table class="admin-table" style="margin-top:12px;"><thead><tr><th>Sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>' + items + "</tbody></table>" +
		'<p style="margin-top:12px;font-size:18px;"><strong>Tổng tiền:</strong> <span style="color:#b48a18;">' + formatVND(o.total) + "</span></p>"
	);
}
function findOrder(id) {
	const key = String(id || "").trim().toUpperCase();
	return (read("db_orders", []) || []).find(function (o) { return o.id === key; }) || null;
}
function productQty(p) {
	const n = Number(p && p.qty);
	return !isFinite(n) || n < 0 ? 0 : Math.floor(n);
}
function productQtyLabel(p) {
	const n = productQty(p);
	return n > 0 ? "Số lượng: " + n : "Đã hết hàng";
}
function siteArea() {
	const path = String(location.pathname || "").replace(/\\/g, "/");
	if (/\/pages\//i.test(path)) return "pages";
	if (/\/admin\//i.test(path)) return "admin";
	if (/\/hoa-don\//i.test(path)) return "hoa-don";
	return "root";
}
function pageHref(file) {
	const name = String(file || "").split("/").pop();
	const area = siteArea();
	if (name === "index.html" || name === "index-guest.html") return area === "root" ? name : "../" + name;
	if (area === "pages") return name;
	if (area === "admin" || area === "hoa-don") return "../pages/" + name;
	return "pages/" + name;
}
function invoiceHref(id) {
	const file = String(id || "").trim().toUpperCase() + ".html";
	const area = siteArea();
	if (area === "hoa-don") return file;
	if (area === "pages" || area === "admin") return "../hoa-don/" + file;
	return "hoa-don/" + file;
}
function detailHref() { return pageHref("product.html"); }
function visibleProducts() { return (read("db_products", []) || []).filter(function (p) { return !p.hidden; }); }

const Auth = {
	user: function () { return read("db_users", [])[0] || null; },
	register: function () { return ""; },
	login: function () { return ""; },
	logout: function () {},
	adminLogin: function () { return ""; },
	isAdmin: function () { return true; },
	adminLogout: function () {},
	addAddress: function () {},
};
function requireLogin() { return true; }
function requireAdmin() { return true; }
function updateNav() {}
function renderCartCount() {
	const el = document.getElementById("cart-count");
	if (el) el.innerText = "1";
}

/* ===== LUXURY NOTIFICATION BANNER DÙNG CHUNG ===== */
function showLuxuryBanner(title, message, options) {
	const opts = options || {};
	const type = opts.type || "success";
	const btnText = opts.btnText || "Đồng ý";
	const cancelText = opts.cancelText || "";
	const onConfirm = typeof opts.onConfirm === "function" ? opts.onConfirm : null;

	let overlay = document.getElementById("lux-banner-overlay");
	if (!overlay) {
		overlay = document.createElement("div");
		overlay.id = "lux-banner-overlay";
		overlay.className = "lux-banner-overlay";
		overlay.innerHTML =
			'<div class="lux-banner-box" role="dialog" aria-modal="true">' +
			'<div class="lux-banner-brand">LUXURY AUTO</div>' +
			'<div class="lux-banner-icon" id="lux-banner-icon"><i class="fa-solid fa-check"></i></div>' +
			'<h3 class="lux-banner-title" id="lux-banner-title"></h3>' +
			'<p class="lux-banner-msg" id="lux-banner-msg"></p>' +
			'<div class="lux-banner-actions">' +
			'<button type="button" class="lux-banner-btn-cancel" id="lux-banner-cancel" style="display:none;"></button>' +
			'<button type="button" class="lux-banner-btn" id="lux-banner-ok"></button>' +
			"</div></div>";
		document.body.appendChild(overlay);
	}

	const iconEl = document.getElementById("lux-banner-icon");
	iconEl.className = "lux-banner-icon" + (type === "warning" ? " warning" : "");
	if (type === "warning") iconEl.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	else if (type === "info") iconEl.innerHTML = '<i class="fa-solid fa-shield-halved"></i>';
	else iconEl.innerHTML = '<i class="fa-solid fa-check"></i>';

	document.getElementById("lux-banner-title").textContent = title || "Thông báo";
	document.getElementById("lux-banner-msg").textContent = message || "";

	const okBtn = document.getElementById("lux-banner-ok");
	const cancelBtn = document.getElementById("lux-banner-cancel");
	okBtn.textContent = btnText;

	if (cancelText) {
		cancelBtn.textContent = cancelText;
		cancelBtn.style.display = "inline-flex";
	} else {
		cancelBtn.style.display = "none";
	}

	function dismissOnly() {
		overlay.classList.remove("show");
	}
	function confirmBanner() {
		overlay.classList.remove("show");
		setTimeout(function () { if (onConfirm) onConfirm(); }, 180);
	}

	okBtn.onclick = confirmBanner;
	cancelBtn.onclick = dismissOnly;
	overlay.onclick = function (e) { if (e.target === overlay) dismissOnly(); };
	requestAnimationFrame(function () { overlay.classList.add("show"); });
}

function addToCart() {
	renderCartCount();
	showLuxuryBanner(
		"Đã Thêm Vào Giỏ Hàng",
		"Phương tiện đã được thêm vào giỏ hàng của quý khách.",
		{ type: "success", btnText: "Tiếp tục xem" }
	);
}

function siteHeaderHtml() {
	const home = pageHref("index.html");
	const productsUrl = pageHref("products.html");
	const searchUrl = pageHref("search-results.html");
	return (
		"<header>" +
		'<div class="logo"><a href="' + home + '"><i class="fa-solid fa-car-rear"></i> LUXURY <span>AUTO</span></a></div>' +
		'<form class="header-search-form" action="' + searchUrl + '" onsubmit="location.href=\'' + searchUrl + '\'; return false;">' +
		'<input type="text" placeholder="Tìm kiếm theo tên phương tiện..." aria-label="Tìm kiếm phương tiện" />' +
		'<button type="submit" title="Tìm kiếm"><i class="fa-solid fa-magnifying-glass"></i></button>' +
		"</form>" +
		'<ul class="nav-right-menu">' +
		'<li><a href="' + home + '"><i class="fa-solid fa-house"></i> Trang chủ</a></li>' +
		'<li><a href="' + productsUrl + '"><i class="fa-solid fa-box-archive"></i> Sản phẩm</a></li>' +
		'<li><a href="' + pageHref("cart.html") + '"><i class="fa-solid fa-cart-shopping"></i> Giỏ hàng (1)</a></li>' +
		'<li class="nav-user-dropdown" id="userDropdown">' +
		'<button class="nav-user-btn" id="userBtn" type="button">' +
		'<img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Nguyễn Văn A" />' +
		"<span>NGUYỄN VĂN A</span>" +
		'<i class="fa-solid fa-caret-down"></i>' +
		"</button>" +
		'<div class="dropdown-menu-box">' +
		'<a href="' + pageHref("account.html") + '"><i class="fa-solid fa-user"></i> Thông tin khách hàng</a>' +
		'<a href="' + pageHref("orders.html") + '"><i class="fa-solid fa-calendar-days"></i> Lịch sử mua hàng</a>' +
		'<a href="' + pageHref("change-password.html") + '"><i class="fa-solid fa-lock"></i> Đổi mật khẩu</a>' +
		"<hr />" +
		'<a href="' + pageHref("logout.html") + '"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>' +
		"</div></li></ul></header>"
	);
}

document.addEventListener("click", function (e) {
	document.querySelectorAll(".nav-user-dropdown").forEach(function (drop) {
		const btn = drop.querySelector(".nav-user-btn");
		if (btn && btn.contains(e.target)) drop.classList.toggle("open");
		else if (!drop.contains(e.target)) drop.classList.remove("open");
	});
});

function siteFooterHtml() {
	const home = pageHref("index.html");
	return (
		'<footer class="custom-footer"><div class="footer-container">' +
		'<div class="footer-header"><div class="footer-logo-box"><i class="fa-solid fa-car-rear"></i></div>' +
		'<h2 class="footer-company-name">CÔNG TY Ô TÔ LUXURY AUTO VIỆT NAM</h2></div>' +
		'<div class="footer-content">' +
		'<div class="footer-col footer-col-legal">' +
		"<p>Số GCNĐKDN: 2500150335 &nbsp;&nbsp;&nbsp; Cấp lần đầu: Ngày 26/03/2007</p>" +
		"<p>Đăng ký thay đổi lần thứ 22: Ngày 05/01/2026</p>" +
		"<p>Cơ quan cấp: Sở tài chính tỉnh Phú Thọ</p>" +
		"<p>Địa chỉ: Phường Phúc Yên, Tỉnh Phú Thọ, Việt Nam</p></div>" +
		'<div class="footer-col footer-col-links"><ul>' +
		'<li><a href="' + home + '">Giới thiệu</a></li><li><a href="' + home + '">Tuyển dụng</a></li><li><a href="' + home + '">Cộng đồng</a></li>' +
		"</ul></div>" +
		'<div class="footer-col footer-col-links"><ul>' +
		'<li><a href="' + home + '">Nội địa hóa</a></li><li><a href="' + home + '">Tạp chí Luxury Auto</a></li><li><a href="' + home + '">Luxury Auto toàn cầu</a></li>' +
		"</ul></div>" +
		'<div class="footer-col footer-col-contact">' +
		"<p>Hotline: <span>1900 1111</span></p><p>Đường dây nóng: <span>0888888888</span></p>" +
		"<p>Hỗ trợ tài chính: <span>0888111188</span></p><p>Bảo hiểm Luxury Auto: <span>1900 001 100</span></p></div>" +
		"</div>" +
		'<div class="footer-bottom"><div class="bocongthuong-badge"><div class="bct-icon"><i class="fa-solid fa-check"></i></div>' +
		'<div class="bct-text"><span class="bct-top">ĐÃ THÔNG BÁO</span><span class="bct-sub">BỘ CÔNG THƯƠNG</span></div></div>' +
		'<div class="footer-copyright-group"><div class="footer-terms">' +
		'<a href="' + home + '">Sơ đồ trang</a><span class="separator">|</span>' +
		'<a href="' + home + '">Chính sách và điều khoản</a><span class="separator">|</span>' +
		'<a href="' + home + '">Chính sách bảo mật thông tin cá nhân</a></div>' +
		'<p class="copyright-text">&copy; Bản quyền thuộc về Công ty ô tô Luxury Auto Việt Nam</p></div></div>' +
		"</div></footer>"
	);
}

function mountChrome() {
	const header = document.getElementById("site-header");
	const footer = document.getElementById("site-footer");
	if (header) header.innerHTML = siteHeaderHtml();
	if (footer) footer.innerHTML = siteFooterHtml();
	updateNav();
	renderCartCount();
}

function getTopCustomers(fromDate, toDate) {
	let orders = (read("db_orders", []) || []).filter(function (o) { return o.status !== "Hủy đơn"; });
	if (fromDate) orders = orders.filter(function (o) { return o.date >= fromDate; });
	if (toDate) orders = orders.filter(function (o) { return o.date <= toDate; });
	const map = {};
	orders.forEach(function (o) {
		const key = o.customerId || o.customerName;
		if (!map[key]) map[key] = { customerName: o.customerName, total: 0, orders: [] };
		map[key].total += Number(o.total) || 0;
		map[key].orders.push(o);
	});
	return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) { return b.total - a.total; }).slice(0, 5);
}