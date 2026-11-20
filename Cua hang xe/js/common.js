/* common.js - dữ liệu dùng chung, đăng nhập, định dạng */
function $(id) {
	return document.getElementById(id);
}
const DATA = {};
var STORE_KEYS = ["db_products", "db_users", "db_orders", "cart"];
function read(k, d) {
	return DATA[k] === undefined ? d : JSON.parse(JSON.stringify(DATA[k]));
}
function save(k, v) {
	DATA[k] = JSON.parse(JSON.stringify(v));
	if (STORE_KEYS.indexOf(k) === -1) return;
	try {
		localStorage.setItem("lux_" + k, JSON.stringify(DATA[k]));
	} catch (e) {}
}

// --- HÀM HỖ TRỢ ĐỊNH DẠNG SỐ KHI NHẬP VÀO INPUT ---
function setupNumberFormatter(inputEl) {
	if (!inputEl) return;

	// Khi đang nhập, tự động thêm dấu phẩy ngăn cách hàng nghìn
	inputEl.addEventListener("input", function (e) {
		let value = this.value.replace(/\D/g, ""); // Chỉ giữ lại ký tự số
		if (value) {
			this.value = Number(value).toLocaleString("en-US"); // Định dạng dấu phẩy (VD: 10,000,000)
		} else {
			this.value = "";
		}
	});
}

// Hàm lấy giá trị số thực tế từ input đã có dấu phẩy để lưu database

function getCleanNumber(inputEl) {
	if (!inputEl) return 0;
	const raw = String(inputEl.value || "").replace(/,/g, "");
	return parseFloat(raw) || 0;
}
function loadStoredData() {
	STORE_KEYS.forEach(function (k) {
		try {
			var raw = localStorage.getItem("lux_" + k);
			if (raw) DATA[k] = JSON.parse(raw);
		} catch (e) {}
	});
}
function formatVND(n) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(Number(n) || 0);
}
function norm(s) {
	return String(s || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "d")
		.toLowerCase()
		.trim();
}

const CATEGORIES = [
	"Moto",
	"Xe máy điện",
	"Pickup",
	"SUV",
	"Phụ kiện",
	"Roadster",
	"Hypercar",
	"Sedan",
];

const PRICE_RANGES = [
	{ value: "", label: "Tất cả khoảng giá" },
	{ value: "under-50m", label: "Dưới 50 Triệu VNĐ", test: (p) => p < 50000000 },
	{
		value: "50m-1b",
		label: "50 Triệu - 1 Tỷ VNĐ",
		test: (p) => p >= 50000000 && p < 1000000000,
	},
	{
		value: "1b-10b",
		label: "1 Tỷ - 10 Tỷ VNĐ",
		test: (p) => p >= 1000000000 && p <= 10000000000,
	},
	{ value: "over-10b", label: "Trên 10 Tỷ VNĐ", test: (p) => p > 10000000000 },
];

const ORDER_STATUS = [
	"Chưa xác nhận",
	"Đã xác nhận",
	"Đã giao (Thành công)",
	"Hủy đơn",
];
const STATUS_FLOW = {
	"Chưa xác nhận": ["Đã xác nhận", "Hủy đơn"],
	"Đã xác nhận": ["Đã giao (Thành công)", "Hủy đơn"],
	"Đã giao (Thành công)": [],
	"Hủy đơn": [],
};

const FALLBACK_IMG =
	"data:image/svg+xml;utf8," +
	encodeURIComponent(
		'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#1e293b"/><text x="50%" y="50%" fill="#d4af37" font-size="40" text-anchor="middle" font-family="Segoe UI">LUXURY AUTO</text></svg>',
	);
document.addEventListener(
	"error",
	function (e) {
		if (e.target && e.target.tagName === "IMG" && e.target.src !== FALLBACK_IMG)
			e.target.src = FALLBACK_IMG;
	},
	true,
);

DATA.db_users = [
	{
		id: 101,
		name: "Nguyễn Văn A",
		email: "anguyen@gmail.com",
		phone: "0901234567",
		password: "123456",
		addresses: ["123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh"],
		isLocked: false,
	},
	{
		id: 102,
		name: "Trần Nguyên Phúc",
		email: "phuctran@gmail.com",
		phone: "0918223344",
		password: "123456",
		addresses: ["12 Lê Lợi, Quận 1, TP. Hồ Chí Minh"],
		isLocked: false,
	},
].concat([
	{
		id: 103,
		name: "Lê Thị B",
		email: "ble@gmail.com",
		phone: "0988123456",
		password: "123456",
		addresses: [],
		isLocked: true,
	},
]);
DATA.db_products = [
	{
		id: 1,
		name: "Kawasaki KLX 150 BF",
		category: "Moto",
		price: 79000000,
		qty: 4,
		img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
		desc: "Mô tô cào cào địa hình chuyên dụng, động cơ 150cc mạnh mẽ.",
		isSold: false,
		hidden: false,
	},
	{
		id: 2,
		name: "VinFast Evo Grand Premia",
		category: "Xe máy điện",
		price: 27900000,
		qty: 8,
		img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
		desc: "Động cơ tối đa 2.250W, tốc độ 70 km/h, quãng đường tới 262 km/sạc, cốp rộng 35 lít.",
		isSold: false,
		hidden: false,
	},
	{
		id: 3,
		name: "Ford Ranger Wildtrak 2.0L",
		category: "Pickup",
		price: 973000000,
		qty: 3,
		img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
		desc: "Siêu bán tải hạng sang, động cơ Bi-Turbo 2.0L, hệ dẫn động 4x4.",
		isSold: false,
		hidden: false,
	},
	{
		id: 4,
		name: "Ford Ranger Raptor",
		category: "Pickup",
		price: 1299000000,
		qty: 2,
		img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
		desc: "Siêu bán tải hiệu suất cao, trang bị hệ thống treo Fox danh tiếng.",
		isSold: false,
		hidden: false,
	},
	{
		id: 5,
		name: "Jeep Wrangler Rubicon",
		category: "SUV",
		price: 3688000000,
		qty: 1,
		img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
		desc: "SUV địa hình biểu tượng, khả năng vượt đá và lội nước cực đỉnh.",
		isSold: false,
		hidden: false,
	},
	{
		id: 6,
		name: "Baga Nhôm Thế Hệ Mới Rhino",
		category: "Phụ kiện",
		price: 8500000,
		qty: 15,
		img: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80",
		desc: "Baga mui nhôm siêu nhẹ, sơn tĩnh điện bền bỉ, dễ dàng lắp đặt.",
		isSold: false,
		hidden: false,
	},
	{
		id: 7,
		name: "Kawasaki D-Tracker 150",
		category: "Moto",
		price: 79000000,
		qty: 6,
		img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
		desc: "Dòng xe Supermoto bánh lốp đường phố, thiết kế năng động.",
		isSold: false,
		hidden: false,
	},
	{
		id: 8,
		name: "Yamaha XTZ 125",
		category: "Moto",
		price: 45000000,
		qty: 5,
		img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
		desc: "Xe cào cào đa địa hình Dual-sport bền bỉ, vận hành linh hoạt.",
		isSold: false,
		hidden: false,
	},
	{
		id: 9,
		name: "Honda XR150L",
		category: "Moto",
		price: 65000000,
		qty: 7,
		img: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=800&q=80",
		desc: "Moto cào cào đường trường, động cơ 150cc tiết kiệm.",
		isSold: false,
		hidden: false,
	},
	{
		id: 10,
		name: "Honda CRF150L",
		category: "Moto",
		price: 78000000,
		qty: 3,
		img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80",
		desc: "Cào cào địa hình chuyên nghiệp, trang bị phuộc USD cao cấp.",
		isSold: false,
		hidden: false,
	},
	{
		id: 11,
		name: "Velocity GT Roadster",
		category: "Roadster",
		price: 12500000000,
		qty: 0,
		img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
		desc: "Động cơ V8 Bi-Turbo 4.0L, 650 Mã lực.",
		isSold: true,
		hidden: false,
	},
	{
		id: 12,
		name: "Phantom Hypercar Limited",
		category: "Hypercar",
		price: 35000000000,
		qty: 10,
		img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
		desc: "Phiên bản giới hạn 10 chiếc toàn cầu.",
		isSold: false,
		hidden: false,
	},
];
DATA.db_orders = [
	{
		id: "ORD-1001",
		customerId: 102,
		customerName: "Trần Nguyên Phúc",
		customerEmail: "phuctran@gmail.com",
		date: "2026-03-15",
		items: [
			{ id: 11, name: "Velocity GT Roadster", price: 12500000000, qty: 1 },
		],
		address: "12 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
		paymentMethod: "Trực tuyến",
		phone: "0918223344",
		total: 12500000000,
		status: "Đã giao (Thành công)",
	},
].concat([
	{
		id: "ORD-1002",
		customerId: 101,
		customerName: "Nguyễn Văn A",
		customerEmail: "anguyen@gmail.com",
		phone: "0901234567",
		date: "2026-05-20",
		items: [
			{ id: 3, name: "Ford Ranger Wildtrak 2.0L", price: 973000000, qty: 1 },
		],
		address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
		paymentMethod: "Tiền mặt",
		total: 973000000,
		status: "Đã xác nhận",
	},
	{
		id: "ORD-1003",
		customerId: 101,
		customerName: "Nguyễn Văn A",
		customerEmail: "anguyen@gmail.com",
		phone: "0901234567",
		date: "2026-08-09",
		items: [
			{ id: 2, name: "VinFast Evo Grand Premia", price: 27900000, qty: 2 },
		],
		address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
		paymentMethod: "Trực tuyến",
		total: 55800000,
		status: "Chưa xác nhận",
	},
	{
		id: "ORD-1004",
		customerId: 101,
		customerName: "Nguyễn Văn A",
		customerEmail: "anguyen@gmail.com",
		phone: "0901234567",
		date: "2026-07-01",
		items: [{ id: 1, name: "Kawasaki KLX 150 BF", price: 79000000, qty: 1 }],
		address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
		paymentMethod: "Trực tuyến",
		total: 79000000,
		status: "Đã giao (Thành công)",
	},
]);
DATA.cart = [
	{ id: 3, name: "Ford Ranger Wildtrak 2.0L", price: 973000000, qty: 1 },
];
loadStoredData();
(function ensurePhones() {
	const phones = { 101: "0901234567", 102: "0918223344", 103: "0988123456" };
	(DATA.db_users || []).forEach(function (u) {
		if (!u.phone && phones[u.id]) u.phone = phones[u.id];
	});
	(DATA.db_orders || []).forEach(function (o) {
		if (!o.phone && phones[o.customerId]) o.phone = phones[o.customerId];
	});
	const demoIds = ["ORD-1002", "ORD-1003", "ORD-1004"];
	demoIds.forEach(function (id) {
		if (
			(DATA.db_orders || []).some(function (o) {
				return o.id === id;
			})
		)
			return;
		const seed = [
			{
				id: "ORD-1002",
				customerId: 101,
				customerName: "Nguyễn Văn A",
				customerEmail: "anguyen@gmail.com",
				phone: "0901234567",
				date: "2026-05-20",
				items: [
					{
						id: 3,
						name: "Ford Ranger Wildtrak 2.0L",
						price: 973000000,
						qty: 1,
					},
				],
				address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
				paymentMethod: "Tiền mặt",
				total: 973000000,
				status: "Đã xác nhận",
			},
			{
				id: "ORD-1003",
				customerId: 101,
				customerName: "Nguyễn Văn A",
				customerEmail: "anguyen@gmail.com",
				phone: "0901234567",
				date: "2026-08-09",
				items: [
					{ id: 2, name: "VinFast Evo Grand Premia", price: 27900000, qty: 2 },
				],
				address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
				paymentMethod: "Trực tuyến",
				total: 55800000,
				status: "Chưa xác nhận",
			},
			{
				id: "ORD-1004",
				customerId: 101,
				customerName: "Nguyễn Văn A",
				customerEmail: "anguyen@gmail.com",
				phone: "0901234567",
				date: "2026-07-01",
				items: [
					{ id: 1, name: "Kawasaki KLX 150 BF", price: 79000000, qty: 1 },
				],
				address: "123 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh",
				paymentMethod: "Trực tuyến",
				total: 79000000,
				status: "Đã giao (Thành công)",
			},
		].find(function (o) {
			return o.id === id;
		});
		if (seed) DATA.db_orders.push(seed);
	});
})();

function fillCategorySelect(selectEl, includeAll) {
	if (!selectEl) return;
	const current = selectEl.value;
	selectEl.innerHTML = includeAll
		? '<option value="">Tất cả phân loại</option>'
		: "";
	CATEGORIES.forEach(function (c) {
		selectEl.innerHTML += '<option value="' + c + '">' + c + "</option>";
	});
	if (current) selectEl.value = current;
}

function fillPriceSelect(selectEl) {
	if (!selectEl) return;
	selectEl.innerHTML = PRICE_RANGES.map(function (r) {
		return '<option value="' + r.value + '">' + r.label + "</option>";
	}).join("");
}

function initProvinceAndDistrictSelectors(provId, distId) {
	const provSelect = document.getElementById(provId);
	const distSelect = document.getElementById(distId);
	if (!provSelect || !distSelect) return;

	const data = window.vietnamData || {};
	provSelect.innerHTML =
		'<option value="">-- Chọn Tỉnh / Thành phố --</option>';
	Object.keys(data).forEach(function (province) {
		provSelect.innerHTML +=
			'<option value="' +
			province.replace(/"/g, "&quot;") +
			'">' +
			province +
			"</option>";
	});

	distSelect.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';
	provSelect.onchange = function () {
		const selectedProv = this.value;
		distSelect.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';
		(data[selectedProv] || []).forEach(function (dist) {
			distSelect.innerHTML +=
				'<option value="' +
				String(dist).replace(/"/g, "&quot;") +
				'">' +
				dist +
				"</option>";
		});
	};
}

function allDistrictOptions() {
	const data = window.vietnamData || {};
	const list = [];
	Object.keys(data).forEach(function (p) {
		data[p].forEach(function (d) {
			list.push({ province: p, district: d });
		});
	});
	return list;
}

function invoiceHtml(o) {
	if (!o)
		return '<p style="color:#b91c1c;text-align:center;">Không tìm thấy hóa đơn.</p>';
	const items = (o.items || [])
		.map(function (i) {
			return (
				"<tr><td>" +
				i.name +
				"</td><td>" +
				(i.qty || 1) +
				"</td><td>" +
				formatVND(i.price) +
				"</td><td>" +
				formatVND((i.price || 0) * (i.qty || 1)) +
				"</td></tr>"
			);
		})
		.join("");
	return (
		'<h3 style="color:var(--primary-color);border-bottom:2px solid var(--accent-color);padding-bottom:8px;">HÓA ĐƠN ' +
		o.id +
		"</h3>" +
		"<p><strong>Khách hàng:</strong> " +
		o.customerName +
		(o.customerEmail ? " (" + o.customerEmail + ")" : "") +
		"</p>" +
		"<p><strong>Số điện thoại:</strong> " +
		(o.phone || "") +
		"</p>" +
		"<p><strong>Ngày lập:</strong> " +
		o.date +
		"</p>" +
		"<p><strong>Địa chỉ giao:</strong> " +
		o.address +
		"</p>" +
		"<p><strong>Thanh toán:</strong> " +
		o.paymentMethod +
		"</p>" +
		"<p><strong>Trạng thái:</strong> " +
		o.status +
		"</p>" +
		'<table class="admin-table" style="margin-top:12px;"><thead><tr><th>Sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>' +
		items +
		"</tbody></table>" +
		'<p style="margin-top:12px;font-size:18px;"><strong>Tổng tiền:</strong> <span style="color:var(--accent-color);">' +
		formatVND(o.total) +
		"</span></p>"
	);
}

function findOrder(id) {
	const key = String(id || "")
		.trim()
		.toUpperCase();
	return (
		(read("db_orders", []) || []).find(function (o) {
			return o.id === key;
		}) || null
	);
}

function productQty(p) {
	const n = Number(p && p.qty);
	if (!isFinite(n) || n < 0) return 0;
	return Math.floor(n);
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
	const name = String(file || "")
		.split("/")
		.pop();
	const area = siteArea();
	if (name === "index.html")
		return area === "root" ? "index.html" : "../index.html";
	if (area === "pages") return name;
	if (area === "admin" || area === "hoa-don") return "../pages/" + name;
	return "pages/" + name;
}

function invoiceHref(id) {
	const file =
		String(id || "")
			.trim()
			.toUpperCase() + ".html";
	const area = siteArea();
	if (area === "hoa-don") return file;
	if (area === "pages" || area === "admin") return "../hoa-don/" + file;
	return "hoa-don/" + file;
}

function detailHref() {
	return pageHref("product.html");
}

function visibleProducts() {
	return (read("db_products", []) || []).filter(function (p) {
		return !p.hidden;
	});
}

function filterProducts(products, searchName, category, priceFilter) {
	let filtered = products.slice();
	if (searchName) {
		const q = norm(searchName);
		filtered = filtered.filter(function (p) {
			return norm(p.name).indexOf(q) !== -1;
		});
	}
	if (category)
		filtered = filtered.filter(function (p) {
			return p.category === category;
		});
	if (priceFilter) {
		const range = PRICE_RANGES.find(function (r) {
			return r.value === priceFilter;
		});
		if (range && range.test)
			filtered = filtered.filter(function (p) {
				return range.test(p.price);
			});
	}
	return filtered;
}

function nextOrderId() {
	const n = 1000 + Math.floor(Math.random() * 9000);
	const id = "ORD-" + n;
	const exists = (read("db_orders", []) || []).some(function (o) {
		return o.id === id;
	});
	return exists ? nextOrderId() : id;
}

const Auth = {
	user: function () {
		if (sessionStorage.getItem("logged_in") !== "1") return null;
		const users = read("db_users", []);
		let currentUser = JSON.parse(
			sessionStorage.getItem("current_user") || "null",
		);
		if (!currentUser && users.length > 0) {
			currentUser = users[0];
			sessionStorage.setItem("current_user", JSON.stringify(currentUser));
		}
		return currentUser;
	},
	register: function (name, email, password, confirm, phone) {
		const users = read("db_users", []) || [];
		users.push({
			id: Date.now(),
			name: name || "Khách",
			email: email || "",
			phone: phone || "",
			password: password || "",
			addresses: [],
			isLocked: false,
		});
		save("db_users", users);
		return "";
	},
	// Dù người dùng nhập gì hoặc không nhập gì, bấm đăng nhập là vào luôn
	login: function (email, password) {
		const users = read("db_users", []) || [];
		// Lấy user đầu tiên làm mặc định cho mọi lần bấm đăng nhập
		let u =
			users.length > 0
				? users[0]
				: { id: 999, name: "Khách", email: "guest@gmail.com" };
		sessionStorage.setItem("current_user", JSON.stringify(u));
		sessionStorage.setItem("logged_in", "1");
		return "";
	},
	logout: function () {
		sessionStorage.setItem("logged_in", "0");
		sessionStorage.removeItem("current_user");
	},
	// Admin cũng đăng nhập thành công ngay lập tức không cần điều kiện
	adminLogin: function (account, password) {
		sessionStorage.setItem("is_admin", "true");
		return "";
	},
	isAdmin: function () {
		return sessionStorage.getItem("is_admin") === "true";
	},
	adminLogout: function () {
		sessionStorage.removeItem("is_admin");
	},
	addAddress: function () {},
};

function requireLogin(nextPage) {
	return true; // Không bắt buộc chuyển hướng trang đăng nhập
}

function requireAdmin() {
	return true; // Không bắt buộc chuyển hướng trang admin-login
}

function updateNav() {
	const loggedIn = sessionStorage.getItem("logged_in") === "1";
	const login = $("nav-login");
	const logout = $("nav-logout");
	if (login) login.style.display = loggedIn ? "none" : "";
	if (logout) logout.style.display = loggedIn ? "" : "none";
}

function renderCartCount() {
	const el = document.getElementById("cart-count");
	if (el) el.innerText = "1";
}

function addToCart() {
	renderCartCount();
	alert("Đã thêm vào giỏ hàng");
}

function siteHeaderHtml() {
	const home = pageHref("index.html");
	return (
		"<header>" +
		'<div class="logo"><a href="' +
		home +
		'"><i class="fa-solid fa-car-rear"></i> LUXURY <span>AUTO</span></a></div>' +
		'<ul class="nav-right-menu">' +
		'<li><a href="' +
		home +
		'"><i class="fa-solid fa-house"></i> Trang chủ</a></li>' +
		'<li><a href="' +
		pageHref("products.html") +
		'"><i class="fa-solid fa-box-archive"></i> Sản phẩm</a></li>' +
		'<li><a href="' +
		pageHref("cart.html") +
		'"><i class="fa-solid fa-cart-shopping"></i> Giỏ hàng (1)</a></li>' +
		'<li class="nav-user-dropdown" id="userDropdown">' +
		'<button class="nav-user-btn" id="userBtn" type="button">' +
		'<img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Nguyễn Văn A" />' +
		"<span>NGUYỄN VĂN A</span>" +
		'<i class="fa-solid fa-caret-down"></i>' +
		"</button>" +
		'<div class="dropdown-menu-box">' +
		'<a href="' +
		pageHref("account.html") +
		'"><i class="fa-solid fa-user"></i> Thông tin khách hàng</a>' +
		'<a href="' +
		pageHref("orders.html") +
		'"><i class="fa-solid fa-calendar-days"></i> Lịch sử mua hàng</a>' +
		'<a href="' +
		pageHref("change-password.html") +
		'"><i class="fa-solid fa-lock"></i> Đổi mật khẩu</a>' +
		"<hr />" +
		'<a href="' +
		pageHref("login.html") +
		'"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>' +
		"</div>" +
		"</li>" +
		"</ul>" +
		"</header>"
	);
}

document.addEventListener("click", function (e) {
	const dropdowns = document.querySelectorAll(".nav-user-dropdown");
	dropdowns.forEach(function (drop) {
		const btn = drop.querySelector(".nav-user-btn");
		if (btn && btn.contains(e.target)) {
			drop.classList.toggle("open");
		} else if (!drop.contains(e.target)) {
			drop.classList.remove("open");
		}
	});
});

// function siteHeaderHtml() {
// 	const home = pageHref("index.html");
// 	return (
// 		"" +
// 		"<header>" +
// 		'<div class="logo"><a href="' +
// 		home +
// 		'"><i class="fa-solid fa-car-rear"></i> LUXURY <span>AUTO</span></a></div>' +
// 		'<nav class="main-nav"><ul class="menu">' +
// 		'<li><a href="' +
// 		home +
// 		'"><i class="fa-solid fa-house"></i> TRANG CHỦ</a></li>' +
// 		'<li><a href="' +
// 		pageHref("products.html") +
// 		'"><i class="fa-solid fa-store"></i> SẢN PHẨM</a></li>' +
// 		'<li><a href="' +
// 		pageHref("cart.html") +
// 		'"><i class="fa-solid fa-cart-shopping"></i> GIỎ HÀNG (<span id="cart-count">0</span>)</a></li>' +
// 		'<li><a href="' +
// 		pageHref("orders.html") +
// 		'"><i class="fa-solid fa-clock-rotate-left"></i> LỊCH SỬ</a></li>' +
// 		'<li class="nav-auth">' +
// 		'<a id="nav-login" href="' +
// 		pageHref("login.html") +
// 		'"><i class="fa-solid fa-user"></i> ĐĂNG NHẬP</a>' +
// 		'<a id="nav-logout" href="' +
// 		pageHref("logout.html") +
// 		'"><i class="fa-solid fa-right-from-bracket"></i> ĐĂNG XUẤT</a>' +
// 		"</li>" +
// 		'<li><a href="' +
// 		pageHref("account.html") +
// 		'" aria-label="Tài khoản"><i class="fa-solid fa-circle-user"></i></a></li>' +
// 		"</ul></nav></header>"
// 	);
// }

function siteFooterHtml() {
	const home = pageHref("index.html");
	return (
		"" +
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
		'<li><a href="' +
		home +
		'">Giới thiệu</a></li><li><a href="' +
		home +
		'">Tuyển dụng</a></li><li><a href="' +
		home +
		'">Cộng đồng</a></li>' +
		"</ul></div>" +
		'<div class="footer-col footer-col-links"><ul>' +
		'<li><a href="' +
		home +
		'">Nội địa hóa</a></li><li><a href="' +
		home +
		'">Tạp chí Luxury Auto</a></li><li><a href="' +
		home +
		'">Luxury Auto toàn cầu</a></li>' +
		"</ul></div>" +
		'<div class="footer-col footer-col-contact">' +
		"<p>Hotline: <span>1900 1111</span></p><p>Đường dây nóng: <span>0888888888</span></p>" +
		"<p>Hỗ trợ tài chính: <span>0888111188</span></p><p>Bảo hiểm Luxury Auto: <span>1900 001 100</span></p></div>" +
		"</div>" +
		'<div class="footer-bottom"><div class="bocongthuong-badge"><div class="bct-icon"><i class="fa-solid fa-check"></i></div>' +
		'<div class="bct-text"><span class="bct-top">ĐÃ THÔNG BÁO</span><span class="bct-sub">BỘ CÔNG THƯƠNG</span></div></div>' +
		'<div class="footer-copyright-group"><div class="footer-terms">' +
		'<a href="' +
		home +
		'">Sơ đồ trang</a><span class="separator">|</span>' +
		'<a href="' +
		home +
		'">Chính sách và điều khoản</a><span class="separator">|</span>' +
		'<a href="' +
		home +
		'">Chính sách bảo mật thông tin cá nhân</a></div>' +
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
	let orders = (read("db_orders", []) || []).filter(function (o) {
		return o.status !== "Hủy đơn";
	});
	if (fromDate)
		orders = orders.filter(function (o) {
			return o.date >= fromDate;
		});
	if (toDate)
		orders = orders.filter(function (o) {
			return o.date <= toDate;
		});
	const map = {};
	orders.forEach(function (o) {
		const key = o.customerId || o.customerName;
		if (!map[key])
			map[key] = { customerName: o.customerName, total: 0, orders: [] };
		map[key].total += Number(o.total) || 0;
		map[key].orders.push(o);
	});
	return Object.keys(map)
		.map(function (k) {
			return map[k];
		})
		.sort(function (a, b) {
			return b.total - a.total;
		})
		.slice(0, 5);
}
