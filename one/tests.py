from django.test import TestCase
import socket
# Create your tests here.
print type(str(socket.gethostbyname(socket.gethostname())))