import io
import base64
import qrcode

def generate_qr_base64(booking_id: str) -> str:
    """
    Generates a server-side QR Code encoding the booking_id.
    Returns a base64 PNG data URL string suitable for direct HTML img src attribute.
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(booking_id)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#171320", back_color="#FAF6ED")
    
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    return f"data:image/png;base64,{img_str}"
