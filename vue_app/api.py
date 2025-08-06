import frappe

@frappe.whitelist()
def checkout_cart(products, address):
    print("Checkout Cart API called with products:", products)
    current_user = frappe.session.user
    new_order = frappe.new_doc("Order")
    new_order.customer = current_user
    new_order.shipping_address = address
    new_order.set("order_items", products)
    new_order.insert(ignore_permissions=True)
    return new_order