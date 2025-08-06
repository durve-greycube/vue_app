# Copyright (c) 2025, GreyCube Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Products(Document):
	@frappe.whitelist()
	def get_customer_supplier_names(self):
		print(frappe.db.get_all("Customer", fields=["name"]),"-----------------")
		customer = [d.name for d in frappe.db.get_all("Customer", fields=["name"])]
		supplier = [d.name for d in frappe.db.get_all("Supplier", fields=["name"])]
		return customer + supplier
