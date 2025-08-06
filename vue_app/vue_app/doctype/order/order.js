// Copyright (c) 2025, GreyCube Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on("Order", {
	refresh(frm) {
        console.log("Order form refreshed");
        frm.call("get_customer_supplier_names").then(({message: customers}) => {
            console.log(customers,"--------");
            frm.fields_dict.customer.set_data(["zelam"])
        })
	},
});
