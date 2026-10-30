/* ==========================================
   common.js - Dữ liệu localStorage, đăng nhập, định dạng và vị trí 2 CẤP MỚI
   ========================================== */
function $(id) { return document.getElementById(id); }
function read(k, d) {
    try {
        const v = JSON.parse(localStorage.getItem(k));
        return v === null || v === undefined ? d : v;
    } catch (e) { return d; }
}
function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) { alert("Bộ nhớ trình duyệt đầy, không lưu được dữ liệu."); }
}
function formatVND(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(n) || 0);
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
    "Moto", "Xe máy điện", "Pickup", "SUV", "Phụ kiện", "Roadster", "Hypercar", "Sedan"
];

const PRICE_RANGES = [
    { value: "", label: "Tất cả khoảng giá" },
    { value: "under-50m", label: "Dưới 50 Triệu VNĐ", test: (p) => p < 50000000 },
    { value: "50m-1b", label: "50 Triệu - 1 Tỷ VNĐ", test: (p) => p >= 50000000 && p < 1000000000 },
    { value: "1b-10b", label: "1 Tỷ - 10 Tỷ VNĐ", test: (p) => p >= 1000000000 && p <= 10000000000 },
    { value: "over-10b", label: "Trên 10 Tỷ VNĐ", test: (p) => p > 10000000000 }
];

const ORDER_STATUS = ["Chưa xác nhận", "Đã xác nhận", "Đã giao (Thành công)", "Hủy đơn"];
const STATUS_FLOW = {
    "Chưa xác nhận": ["Đã xác nhận", "Hủy đơn"],
    "Đã xác nhận": ["Đã giao (Thành công)", "Hủy đơn"],
    "Đã giao (Thành công)": [],
    "Hủy đơn": []
};

/* =========================================================
   DANH SÁCH TỈNH/THÀNH PHỐ VÀ XÃ/PHƯỜNG (MÔ HÌNH 2 CẤP)
   ========================================================= */
const VIETNAM_LOCATIONS_DATA = [
    {
        province: "Thành phố Hồ Chí Minh",
        wards: [
            "Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho", "Phường Cầu Ông Lãnh", "Phường Cô Giang", 
            "Phường Đa Kao", "Phường Nguyễn Cư Trinh", "Phường Nguyễn Thái Bình", "Phường Phạm Ngũ Lão", "Phường Tân Định",
            "Phường Võ Thị Sáu", "Phường Bình Thuận", "Phường Phú Mỹ", "Phường Phú Thuận", "Phường Tân Hưng", 
            "Phường Tân Kiểng", "Phường Tân Phong", "Phường Tân Phú", "Phường Tân Quy", "Phường Tân Thuận Đông", 
            "Phường Tân Thuận Tây", "Phường An Khánh", "Phường An Lợi Đông", "Phường An Phú", "Phường Bình Chiểu", 
            "Phường Bình Thọ", "Phường Bình Trưng Đông", "Phường Bình Trưng Tây", "Phường Cát Lái", "Phường Hiệp Bình Chánh", 
            "Phường Hiệp Bình Phước", "Phường Hiệp Phú", "Phường Linh Chiểu", "Phường Linh Đông", "Phường Linh Tây", 
            "Phường Linh Trung", "Phường Linh Xuân", "Phường Long Bình", "Phường Long Phước", "Phường Long Thạnh Mỹ", 
            "Phường Long Trường", "Phường Phú Hữu", "Phường Phước Long A", "Phường Phước Long B", "Phường Phước Thạnh", 
            "Phường Tam Bình", "Phường Tam Phú", "Phường Tăng Nhơn Phú A", "Phường Tăng Nhơn Phú B", "Phường Thạnh Mỹ Lợi", 
            "Phường Thảo Điền", "Phường Thủ Thiêm", "Phường Trường Thạnh", "Phường Trường Thọ", "Thị trấn Tân Túc", 
            "Xã An Phú Tây", "Xã Bình Hưng", "Xã Bình Lợi", "Xã Bình Chánh", "Xã Đa Phước", "Xã Hưng Long", 
            "Xã Lê Minh Xuân", "Xã Phạm Văn Hai", "Xã Phong Phú", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B"
        ]
    },
    {
        province: "Thành phố Hà Nội",
        wards: [
            "Phường Chương Dương", "Phường Cửa Đông", "Phường Cửa Nam", "Phường Đồng Xuân", "Phường Hàng Bạc", 
            "Phường Hàng Bài", "Phường Hàng Bồ", "Phường Hàng Bông", "Phường Hàng Buồm", "Phường Hàng Đào", 
            "Phường Hàng Gai", "Phường Hàng Mã", "Phường Hàng Trống", "Phường Lý Thái Tổ", "Phường Phan Chu Trinh", 
            "Phường Phúc Tân", "Phường Trần Hưng Đạo", "Phường Tràng Tiền", "Phường Cống Vị", "Phường Điện Biên", 
            "Phường Đội Cấn", "Phường Giảng Võ", "Phường Kim Mã", "Phường Liễu Giai", "Phường Ngọc Hà", 
            "Phường Ngọc Khánh", "Phường Nguyễn Trung Trực", "Phường Phúc Xá", "Phường Thành Công", "Phường Trúc Bạch", 
            "Phường Vĩnh Phúc", "Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Mai Dịch", "Phường Nghĩa Đô", 
            "Phường Nghĩa Tân", "Phường Quan Hoa", "Phường Trung Hòa", "Phường Yên Hòa", "Phường Biên Giang", 
            "Phường Dương Nội", "Phường Đồng Mai", "Phường Hà Cầu", "Phường Kiến Hưng", "Phường Mộ Lao", 
            "Phường Nguyễn Trãi", "Phường Phú La", "Phường Phú Lãm", "Phường Phú Lương", "Phường Phúc La", 
            "Phường Quang Trung", "Phường Vạn Phúc", "Phường Văn Quán", "Phường Yên Nghĩa"
        ]
    },
    {
        province: "Thành phố Hải Phòng",
        wards: [
            "Phường Hạ Lý", "Phường Hoàng Văn Thụ", "Phường Hùng Vương", "Phường Minh Khai", "Phường Phan Bội Châu", 
            "Phường Quán Toan", "Phường Sở Dầu", "Phường Thượng Lý", "Phường Trại Chuối", "Phường Cầu Đất", 
            "Phường Cầu Tre", "Phường Đằng Giang", "Phường Đông Khê", "Phường Gia Viên", "Phường Lạc Viên", 
            "Phường Lạch Tray", "Phường Lê Lợi", "Phường Máy Chai", "Phường Máy Tơ", "Phường Vạn Mỹ"
        ]
    },
    {
        province: "Thành phố Đà Nẵng",
        wards: [
            "Phường Bình Hiên", "Phường Bình Thuận", "Phường Hải Châu I", "Phường Hải Châu II", "Phường Hòa Cường Bắc", 
            "Phường Hòa Cường Nam", "Phường Hòa Thuận Đông", "Phường Hòa Thuận Tây", "Phường Nam Dương", "Phường Phước Ninh", 
            "Phường Thạch Thang", "Phường Thanh Bình", "Phường Thuận Phước", "Phường An Hải Bắc", "Phường An Hải Đông", 
            "Phường An Hải Tây", "Phường Mân Thái", "Phường Nại Hiên Đông", "Phường Phước Mỹ", "Phường Thọ Quang"
        ]
    },
    {
        province: "Thành phố Cần Thơ",
        wards: [
            "Phường An Cư", "Phường An Hòa", "Phường An Khánh", "Phường An Lạc", "Phường An Nghiệp", 
            "Phường An Phú", "Phường Cái Khế", "Phường Hưng Lợi", "Phường Tân An", "Phường Thới Bình", "Phường Xuân Khánh"
        ]
    },
    {
        province: "Thành phố Huế",
        wards: [
            "Phường Tây Lộc", "Phường Thuận Lộc", "Phường Thuận Hòa", "Phường Thuận Thành", 
            "Phường Phú Hậu", "Phường Phú Hiệp", "Phường Phú Cát"
        ]
    },
    {
        province: "Tỉnh Phú Thọ",
        wards: [
            "Phường Bạch Hạc", "Phường Dữu Lâu", "Phường Gia Cẩm", "Phường Minh Nông", "Phường Minh Phương", 
            "Phường Nông Trang", "Phường Tân Dân", "Phường Thọ Sơn", "Phường Tiên Cát", "Phường Vân Cơ", "Phường Vân Phú"
        ]
    },
    {
        province: "Tỉnh Lâm Đồng",
        wards: [
            "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", 
            "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Xã Tà Nung", "Xã Xuân Thọ", "Xã Xuân Trường"
        ]
    },
    {
        province: "Tỉnh Đồng Nai",
        wards: [
            "Phường An Bình", "Phường An Hòa", "Phường Bình Đa", "Phường Bửu Hòa", "Phường Bửu Long", 
            "Phường Hóa An", "Phường Hòa Bình", "Phường Long Bình", "Phường Long Bình Tân", "Phường Quang Vinh", 
            "Phường Quyết Thắng", "Phường Tam Hiệp", "Phường Tam Hòa", "Phường Tam Phước", "Phường Tân Biên", 
            "Phường Tân Hạnh", "Phường Tân Hòa", "Phường Tân Mai", "Phường Tân Phong", "Phường Tân Tiến", 
            "Phường Tân Vạn", "Phường Thanh Bình", "Phường Trảng Dài", "Phường Trung Dũng", "Xã An Hòa", "Xã Long Hưng"
        ]
    },
    {
        province: "Tỉnh Tây Ninh",
        wards: [
            "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường Hiệp Ninh", 
            "Phường Ninh Sơn", "Phường Ninh Thạnh", "Xã Bình Minh", "Xã Tân Bình"
        ]
    },
    {
        province: "Tỉnh Nghệ An",
        wards: [
            "Phường Bến Thủy", "Phường Cửa Nam", "Phường Đội Cung", "Phường Đông Vĩnh", "Phường Hà Huy Tập", 
            "Phường Hồng Sơn", "Phường Hưng Bình", "Phường Hưng Dũng", "Phường Hưng Lộc", "Phường Hưng Phúc", 
            "Phường Hưng Thạnh", "Phường Lê Lợi", "Phường Lê Mao", "Phường Quán Bàu", "Phường Quang Trung", 
            "Phường Trung Đô", "Phường Trường Thi", "Phường Vinh Tân", "Xã Hưng Chính", "Xã Hưng Đông", 
            "Xã Hưng Hòa", "Xã Nghi Ân", "Xã Nghi Đức", "Xã Nghi Kim", "Xã Nghi Liên"
        ]
    },
    {
        province: "Tỉnh Thanh Hóa",
        wards: [
            "Phường Ba Đình", "Phường Điện Biên", "Phường Đông Cương", "Phường Đông Hải", "Phường Đông Hương", 
            "Phường Đông Lĩnh", "Phường Đông Sơn", "Phường Đông Thọ", "Phường Đông Vệ", "Phường Hàm Rồng", 
            "Phường Lam Sơn", "Phường Nam Ngạn", "Phường Ngọc Trạo", "Phường Phú Sơn", "Phường Quảng Cát", 
            "Phường Quảng Đông", "Phường Quảng Hưng", "Phường Quảng Phú", "Phường Quảng Tâm", "Phường Quảng Thắng", 
            "Phường Quảng Thành", "Phường Quảng Thịnh", "Phường Tào Xuyên", "Phường Thiệu Dương", "Phường Thiệu Khánh", 
            "Phường Trung Sơn", "Xã Hoằng Đại", "Xã Quảng Đông", "Xã Thiệu Vân"
        ]
    },
    { province: "Tỉnh Tuyên Quang", wards: ["Phường An Tường", "Phường Ỷ La", "Phường Minh Xuân", "Phường Tân Quang", "Phường Phan Thiết", "Phường Nông Tiến", "Phường Hưng Thành", "Phường Đội Cấn"] },
    { province: "Tỉnh Lào Cai", wards: ["Phường Duyên Hải", "Phường Cốc Lếu", "Phường Kim Tân", "Phường Lào Cai", "Phường Phố Mới", "Phường Bắc Cường", "Phường Nam Cường", "Phường Pom Hán", "Phường Bắc Lệnh"] },
    { province: "Tỉnh Thái Nguyên", wards: ["Phường Trưng Vương", "Phường Hoàng Văn Thụ", "Phường Phan Đình Phùng", "Phường Quang Trung", "Phường Tân Thịnh", "Phường Thịnh Đán", "Phường Đồng Bẩm", "Phường Gia Sàng", "Phường Chùa Hang"] },
    { province: "Tỉnh Bắc Ninh", wards: ["Phường Vệ An", "Phường Đáp Cầu", "Phường Thị Cầu", "Phường Vũ Ninh", "Phường Kinh Bắc", "Phường Suối Hoa", "Phường Ninh Xá", "Phường Tiền An", "Phường Đại Phúc", "Phường Võ Cường"] },
    { province: "Tỉnh Hưng Yên", wards: ["Phường Hiến Nam", "Phường An Tảo", "Phường Lê Lợi", "Phường Minh Khai", "Phường Lam Sơn", "Phường Hồng Châu", "Phường Quang Trung"] },
    { province: "Tỉnh Ninh Bình", wards: ["Phường Bích Đào", "Phường Đông Thành", "Phường Nam Thành", "Phường Tân Thành", "Phường Thanh Bình", "Phường Vân Giang", "Phường Ninh Khánh", "Phường Ninh Phong", "Phường Ninh Sơn"] },
    { province: "Tỉnh Quảng Trị", wards: ["Phường Đồng Mỹ", "Phường Đồng Phú", "Phường Đồng Sơn", "Phường Hải Đình", "Phường Hải Thành", "Phường Nam Lý", "Phường Bắc Lý", "Phường Đức Ninh Đông"] },
    { province: "Tỉnh Quảng Ngãi", wards: ["Phường Lê Hồng Phong", "Phường Nguyễn Nghiêm", "Phường Trần Hưng Đạo", "Phường Trần Phú", "Phường Chánh Lộ", "Phường Nghĩa Chánh", "Phường Nghĩa Lệnh", "Phường Quảng Phú"] },
    { province: "Tỉnh Gia Lai", wards: ["Phường Diên Hồng", "Phường Hoa Lư", "Phường Hội Phú", "Phường Hội Thương", "Phường Ia Kring", "Phường Phù Đổng", "Phường Tây Sơn", "Phường Thắng Lợi", "Phường Thống Nhất", "Phường Trà Bá"] },
    { province: "Tỉnh Khánh Hòa", wards: ["Phường Lộc Thọ", "Phường Ngọc Hiệp", "Phường Phước Hải", "Phường Phước Hòa", "Phường Phước Long", "Phường Phước Tân", "Phường Phước Tiến", "Phường Phương Sài", "Phường Phương Sơn", "Phường Tân Lập", "Phường Vạn Thắng", "Phường Vạn Thạnh", "Phường Vĩnh Hải", "Phường Vĩnh Hòa", "Phường Vĩnh Nguyên", "Phường Vĩnh Phước", "Phường Vĩnh Thọ", "Phường Vĩnh Trường"] },
    { province: "Tỉnh Đắk Lắk", wards: ["Phường Ea Tam", "Phường Khánh Xuân", "Phường Tân An", "Phường Tân Lập", "Phường Tân Lợi", "Phường Tân Thành", "Phường Tân Tiến", "Phường Thắng Lợi", "Phường Thành Công", "Phường Thống Nhất", "Phường Tự An"] },
    { province: "Tỉnh Vĩnh Long", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 8", "Phường 9", "Xã Tân Ngãi", "Xã Tân Hòa", "Xã Trường An"] },
    { province: "Tỉnh Đồng Tháp", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 6", "Phường Hòa Thuận", "Xã Mỹ Ngãi", "Xã Tịnh Thới", "Xã Tân Thuận Tây"] },
    { province: "Tỉnh Cà Mau", wards: ["Phường 1", "Phường 2", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Xã An Xuyên", "Xã Định Bình", "Xã Tắc Vân", "Xã Tân Thành"] },
    { province: "Tỉnh An Giang", wards: ["Phường Mỹ Bình", "Phường Mỹ Long", "Phường Mỹ Phước", "Phường Mỹ Quý", "Phường Mỹ Thới", "Phường Mỹ Thạnh", "Phường Bình Đức", "Phường Bình Khánh", "Xã Mỹ Khánh"] },
    { province: "Tỉnh Cao Bằng", wards: ["Phường Hợp Giang", "Phường Sông Bằng", "Phường Sông Hiến", "Phường Tân Giang", "Phường Đề Thám", "Xã Chu Trinh", "Xã Hưng Đạo"] },
    { province: "Tỉnh Lạng Sơn", wards: ["Phường Chi Lăng", "Phường Đông Kinh", "Phường Hoàng Văn Thụ", "Phường Tam Thanh", "Phường Vĩnh Trại", "Xã Mai Pha"] },
    { province: "Tỉnh Quảng Ninh", wards: ["Phường Bạch Đằng", "Phường Bãi Cháy", "Phường Cao Hanh", "Phường Cao Xanh", "Phường Đại Yên", "Phường Giếng Đáy", "Phường Hà An", "Phường Hà Khánh", "Phường Hà khẩu", "Phường Hà Lầm", "Phường Hà Phong", "Phường Hà Trung", "Phường Hà Tu", "Phường Hoành Bồ", "Phường Hùng Thắng", "Phường Trần Hưng Đạo", "Phường Tuần Châu"] },
    { province: "Tỉnh Sơn La", wards: ["Phường Chiềng An", "Phường Chiềng Cơi", "Phường Chiềng Cọ", "Phường Chiềng Lề", "Phường Chiềng Sinh", "Phường Quyết Thắng", "Phường Quyết Tâm", "Phường Tô Hiệu"] },
    { province: "Tỉnh Điện Biên", wards: ["Phường Him Lam", "Phường Mường Thanh", "Phường Nam Thanh", "Phường Noong Bua", "Phường Tân Thanh", "Phường Thanh Bình", "Xã Nà Nhạn", "Xã Thanh Minh"] },
    { province: "Tỉnh Lai Châu", wards: ["Phường Đoàn Kết", "Phường Quyết Thắng", "Phường Quyết Tiến", "Phường Tân Phong", "Xã San Thàng"] },
    { province: "Tỉnh Hà Tĩnh", wards: ["Phường Bắc Hà", "Phường Đại Nài", "Phường Hà Huy Tập", "Phường Nam Hà", "Phường Nguyễn Du", "Phường Tân Giang", "Phường Trần Phú", "Xã Thạch Bình", "Xã Thạch Hạ", "Xã Thạch Môn"] }
];

/* Khởi tạo bộ chọn 2 CẤP: Tỉnh -> Xã/Phường/Thị trấn/Đặc khu */
function initProvinceAndWardSelectors(provId, wardId) {
    const provSelect = document.getElementById(provId);
    const wardSelect = document.getElementById(wardId);

    if (!provSelect || !wardSelect) return;

    provSelect.innerHTML = '<option value="">-- Chọn Tỉnh / Thành phố --</option>';
    VIETNAM_LOCATIONS_DATA.forEach(function (item) {
        provSelect.innerHTML += '<option value="' + item.province + '">' + item.province + "</option>";
    });

    wardSelect.innerHTML = '<option value="">-- Chọn Xã / Phường / Đặc khu --</option>';

    provSelect.onchange = function () {
        const selectedProv = this.value;
        wardSelect.innerHTML = '<option value="">-- Chọn Xã / Phường / Đặc khu --</option>';

        const foundProv = VIETNAM_LOCATIONS_DATA.find(function(item) { return item.province === selectedProv; });
        if (foundProv && foundProv.wards) {
            foundProv.wards.forEach(function (w) {
                wardSelect.innerHTML += '<option value="' + w + '">' + w + "</option>";
            });
        }
    };
}

const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#1e293b"/><text x="50%" y="50%" fill="#d4af37" font-size="40" text-anchor="middle" font-family="Segoe UI">LUXURY AUTO</text></svg>'
);
document.addEventListener("error", function (e) {
    if (e.target && e.target.tagName === "IMG" && e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
}, true);

const DB_VER = "14";
if (localStorage.getItem("db_ver") !== DB_VER) {
    localStorage.removeItem("db_products");
    localStorage.removeItem("db_orders");
    localStorage.removeItem("db_users");
    localStorage.removeItem("cart");
    localStorage.removeItem("session_user");
    localStorage.removeItem("session_admin");

    save("db_users", [
        { id: 101, name: "Nguyễn Văn A", email: "anguyen@gmail.com", password: "123456", addresses: ["123 Lê Văn Sỹ, Phường Võ Thị Sáu, Thành phố Hồ Chí Minh"], isLocked: false },
        { id: 102, name: "Trần Nguyên Phúc", email: "phuctran@gmail.com", password: "123456", addresses: ["12 Lê Lợi, Phường Bến Nghé, Thành phố Hồ Chí Minh"], isLocked: false }
    ]);
    save("db_products", [
        { id: 1, name: "Kawasaki KLX 150 BF", category: "Moto", price: 79000000, img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80", desc: "Mô tô cào cào địa hình chuyên dụng, động cơ 150cc mạnh mẽ.", isSold: false, hidden: false },
        { id: 2, name: "VinFast Evo Grand Premia", category: "Xe máy điện", price: 27900000, img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80", desc: "Động cơ tối đa 2.250W, tốc độ 70 km/h, quãng đường tới 262 km/sạc, cốp rộng 35 lít.", isSold: false, hidden: false },
        { id: 3, name: "Ford Ranger Wildtrak 2.0L", category: "Pickup", price: 973000000, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", desc: "Siêu bán tải hạng sang, động cơ Bi-Turbo 2.0L, hệ dẫn động 4x4.", isSold: false, hidden: false },
        { id: 4, name: "Ford Ranger Raptor", category: "Pickup", price: 1299000000, img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", desc: "Siêu bán tải hiệu suất cao, trang bị hệ thống treo Fox danh tiếng.", isSold: false, hidden: false },
        { id: 5, name: "Jeep Wrangler Rubicon", category: "SUV", price: 3688000000, img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80", desc: "SUV địa hình biểu tượng, khả năng vượt đá và lội nước cực đỉnh.", isSold: false, hidden: false },
        { id: 6, name: "Baga Nhôm Thế Hệ Mới Rhino", category: "Phụ kiện", price: 8500000, img: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80", desc: "Baga mui nhôm siêu nhẹ, sơn tĩnh điện bền bỉ, dễ dàng lắp đặt.", isSold: false, hidden: false },
        { id: 7, name: "Kawasaki D-Tracker 150", category: "Moto", price: 79000000, img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80", desc: "Dòng xe Supermoto bánh lốp đường phố, thiết kế năng động.", isSold: false, hidden: false },
        { id: 8, name: "Yamaha XTZ 125", category: "Moto", price: 45000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80", desc: "Xe cào cào đa địa hình Dual-sport bền bỉ, vận hành linh hoạt.", isSold: false, hidden: false },
        { id: 9, name: "Honda XR150L", category: "Moto", price: 65000000, img: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=800&q=80", desc: "Moto cào cào đường trường, động cơ 150cc tiết kiệm.", isSold: false, hidden: false },
        { id: 10, name: "Honda CRF150L", category: "Moto", price: 78000000, img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80", desc: "Cào cào địa hình chuyên nghiệp, trang bị phuộc USD cao cấp.", isSold: false, hidden: false },
        { id: 11, name: "Velocity GT Roadster", category: "Roadster", price: 12500000000, img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", desc: "Động cơ V8 Bi-Turbo 4.0L, 650 Mã lực.", isSold: true, hidden: false },
        { id: 12, name: "Phantom Hypercar Limited", category: "Hypercar", price: 35000000000, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", desc: "Phiên bản giới hạn 10 chiếc toàn cầu.", isSold: false, hidden: false }
    ]);
    save("db_orders", [
        {
            id: "ORD-1001",
            customerId: 102,
            customerName: "Trần Nguyên Phúc",
            customerEmail: "phuctran@gmail.com",
            date: "2026-03-15",
            items: [{ id: 11, name: "Velocity GT Roadster", price: 12500000000, qty: 1 }],
            address: "12 Lê Lợi, Phường Bến Nghé, Thành phố Hồ Chí Minh",
            paymentMethod: "Trực tuyến",
            total: 12500000000,
            status: "Đã giao (Thành công)"
        }
    ]);
    save("cart", []);
    localStorage.setItem("db_ver", DB_VER);
}

function fillCategorySelect(selectEl, includeAll) {
    if (!selectEl) return;
    const current = selectEl.value;
    selectEl.innerHTML = includeAll ? '<option value="">Tất cả phân loại</option>' : "";
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

function invoiceHtml(o) {
    if (!o) return '<p style="color:#b91c1c;text-align:center;">Không tìm thấy hóa đơn.</p>';
    const items = (o.items || []).map(function (i) {
        return "<tr><td>" + i.name + "</td><td>" + (i.qty || 1) + "</td><td>" + formatVND(i.price) + "</td><td>" + formatVND((i.price || 0) * (i.qty || 1)) + "</td></tr>";
    }).join("");
    return (
        '<h3 style="color:var(--primary-color);border-bottom:2px solid var(--accent-color);padding-bottom:8px;">HÓA ĐƠN ' + o.id + "</h3>" +
        "<p><strong>Khách hàng:</strong> " + o.customerName + (o.customerEmail ? " (" + o.customerEmail + ")" : "") + "</p>" +
        "<p><strong>Ngày lập:</strong> " + o.date + "</p>" +
        "<p><strong>Địa chỉ giao:</strong> " + o.address + "</p>" +
        "<p><strong>Thanh toán:</strong> " + o.paymentMethod + "</p>" +
        "<p><strong>Trạng thái:</strong> " + o.status + "</p>" +
        '<table class="admin-table" style="margin-top:12px;"><thead><tr><th>Sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>' +
        items +
        "</tbody></table>" +
        '<p style="margin-top:12px;font-size:18px;"><strong>Tổng tiền:</strong> <span style="color:var(--accent-color);">' + formatVND(o.total) + "</span></p>"
    );
}

function findOrder(id) {
    const key = String(id || "").trim().toUpperCase();
    return (read("db_orders", []) || []).find(function (o) { return o.id === key; }) || null;
}

function visibleProducts() {
    return (read("db_products", []) || []).filter(function (p) { return !p.hidden; });
}

function filterProducts(products, searchName, category, priceFilter) {
    let filtered = products.slice();
    if (searchName) {
        const q = norm(searchName);
        filtered = filtered.filter(function (p) { return norm(p.name).indexOf(q) !== -1; });
    }
    if (category) filtered = filtered.filter(function (p) { return p.category === category; });
    if (priceFilter) {
        const range = PRICE_RANGES.find(function (r) { return r.value === priceFilter; });
        if (range && range.test) filtered = filtered.filter(function (p) { return range.test(p.price); });
    }
    return filtered;
}

function nextOrderId() {
    const n = 1000 + Math.floor(Math.random() * 9000);
    const id = "ORD-" + n;
    const exists = (read("db_orders", []) || []).some(function (o) { return o.id === id; });
    return exists ? nextOrderId() : id;
}

const Auth = {
    user: function () {
        const id = read("session_user", null);
        if (!id) return null;
        return (read("db_users", []) || []).find(function (x) { return x.id === id; }) || null;
    },
    register: function (name, email, password, confirm) {
        name = String(name || "").trim();
        email = String(email || "").trim();
        if (!name) return "Vui lòng nhập họ tên.";
        if (!email) return "Vui lòng nhập tên đăng nhập / Gmail.";
        if (!password || String(password).length < 4) return "Mật khẩu tối thiểu 4 ký tự.";
        if (password !== confirm) return "Xác nhận mật khẩu không khớp.";
        const users = read("db_users", []) || [];
        if (users.some(function (u) { return u.email.toLowerCase() === email.toLowerCase(); })) {
            return "Tài khoản / Gmail đã tồn tại.";
        }
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            password: String(password),
            addresses: [],
            isLocked: false
        };
        users.push(user);
        save("db_users", users);
        return "";
    },
    login: function (email, password) {
        email = String(email || "").trim();
        if (!email) return "Vui lòng nhập tên đăng nhập hoặc Gmail.";

        let users = read("db_users", []) || [];
        let u = users.find(function (x) {
            return x.email.toLowerCase() === email.toLowerCase();
        });

        if (!u) {
            u = {
                id: Date.now(),
                name: email.split("@")[0] || "Khách hàng",
                email: email,
                password: String(password || "123456"),
                addresses: [],
                isLocked: false
            };
            users.push(u);
            save("db_users", users);
        }

        if (u.isLocked) return "Tài khoản đang bị khóa!";

        save("session_user", u.id);
        return "";
    },
    logout: function () { localStorage.removeItem("session_user"); },
    adminLogin: function (account, password) {
        if (String(account || "").trim()) {
            save("session_admin", true);
            return "";
        }
        return "Vui lòng nhập tài khoản quản trị.";
    },
    isAdmin: function () { return read("session_admin", false) === true; },
    adminLogout: function () { localStorage.removeItem("session_admin"); },
    addAddress: function (address) {
        const u = Auth.user();
        if (!u || !address) return;
        const users = read("db_users", []) || [];
        const found = users.find(function (x) { return x.id === u.id; });
        if (!found) return;
        found.addresses = found.addresses || [];
        if (found.addresses.indexOf(address) === -1) found.addresses.push(address);
        save("db_users", users);
    }
};

function requireLogin(nextPage) {
    if (Auth.user()) return true;
    const next = nextPage ? ("?next=" + encodeURIComponent(nextPage)) : "";
    alert("Vui lòng đăng nhập để tiếp tục.");
    location.href = "login.html" + next;
    return false;
}

function requireAdmin() {
    if (Auth.isAdmin()) return true;
    alert("Vui lòng đăng nhập quản trị.");
    location.href = "admin-login.html";
    return false;
}

function updateNav() {
    const u = Auth.user();
    const userEl = document.getElementById("nav-user");
    const loginEl = document.getElementById("nav-login");
    const logoutEl = document.getElementById("nav-logout");
    const nameEl = document.getElementById("nav-user-name");
    if (userEl && nameEl) {
        if (u) {
            userEl.style.display = "";
            nameEl.textContent = u.name + " (" + u.email + ")";
        } else {
            userEl.style.display = "none";
        }
    }
    if (loginEl) loginEl.style.display = u ? "none" : "";
    if (logoutEl) logoutEl.style.display = u ? "" : "none";
}