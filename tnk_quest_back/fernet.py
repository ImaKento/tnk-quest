from cryptography.fernet import Fernet

f = Fernet.generate_key().decode()
print(f)