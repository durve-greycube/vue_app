frappe.pages["form-1"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("form"),
		single_column: true,
	});
};

frappe.pages["form-1"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("form_1.bundle.js").then(() => {
		frappe.form_1 = new frappe.ui.Form1({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}