from setuptools import setup
from Cython.Build import cythonize
import os as vlmos
from time import sleep as vlmsleep
import requests as vlmreq
import json as vlmjson
import kivy
import requests
import subprocess
from ctypes import *
import sys as vlmsys
from selenium import webdriver as vlmweb
from datetime import datetime
from os.path import isfile, join



class vlm:
    def vlmset():
        setup(
            name='Hello world app',
            ext_modules=cythonize("hello.pyx"),
            zip_safe=False,
            )

vlm().vlmset