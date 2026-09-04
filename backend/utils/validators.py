import re

def validate_email(email: str) -> bool:
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(regex, email))

def validate_phone(phone: str) -> bool:
    regex = r'^[0-9+\-\s]{8,15}$'
    return bool(re.match(regex, phone))
