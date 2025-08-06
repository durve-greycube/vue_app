# Copyright (c) 2025, GreyCube Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Order(Document):
	@frappe.whitelist()
	def get_customer_supplier_names(self):
		print(frappe.db.get_all("Customer", fields=["name"]),"-----------------")
		return ["zelam"]
