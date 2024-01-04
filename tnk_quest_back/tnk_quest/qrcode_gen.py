import qrcode

# 生成するQRコードに含めるURL
# url = "http://192.168.11.133:8080/kichi_customer"
url = "http://192.168.11.133:8080/kichi_cancel_page"

# QRコードを生成
qr = qrcode.QRCode(
    version=1,  # QRコードのバージョン
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # 誤り訂正レベル
    box_size=10,  # QRコードのサイズ
    border=4,  # 周囲の余白サイズ
)
qr.add_data(url)
qr.make(fit=True)

# QRコードを画像ファイルに保存
img = qr.make_image(fill_color="black", back_color="white")
img.save("kichi_customer_qr.png")

print("QRコードが生成されました。")
