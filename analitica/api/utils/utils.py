import json
import hashlib
import time

def calculate_hash(data):
    """Genera un hash SHA-512 del contenido JSON."""
    json_string = json.dumps(data, sort_keys=True).encode('utf-8')
    return hashlib.sha512(json_string).hexdigest()

def start_timer():
    """
    Inicia el temporizador de tiempo de procesamiento.
    """
    return time.time()

def end_timer(start_time):
    """
    Finaliza el temporizador y devuelve el tiempo transcurrido en segundos.
    """
    return round(time.time() - start_time, 2)