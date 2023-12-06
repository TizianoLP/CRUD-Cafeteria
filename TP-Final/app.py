from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app)

class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(host=host, user=user, password=password)
        self.cursor = self.conn.cursor()
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS empleados (
                nombre VARCHAR(255) NOT NULL,
                apellido VARCHAR(255) NOT NULL,
                dni INT NOT NULL,
                puesto VARCHAR(255) NOT NULL,
                salario INT NOT NULL,
                turno VARCHAR(255) NOT NULL
            )
        ''')
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def listar_empleados(self):
        self.cursor.execute("SELECT * FROM empleados")
        empleados = self.cursor.fetchall()
        return empleados

    def consultar_empleado(self, dni):
        self.cursor.execute(f"SELECT * FROM empleados WHERE dni = {dni}")
        return self.cursor.fetchone()

    def mostrar_empleado(self, dni):
        empleado = self.consultar_empleado(dni)
        if empleado:
            print("-" * 40)
            print(f"Nombre.....: {empleado['nombre']}")
            print(f"Apellido...: {empleado['apellido']}")
            print(f"DNI........: {empleado['dni']}")
            print(f"Puesto.....: {empleado['puesto']}")
            print(f"Salario....: {empleado['salario']}")
            print(f"Turno......: {empleado['turno']}")
            print("-" * 40)
        else:
            print("Empleado no encontrado.")

    def agregar_empleado(self, nombre, apellido, dni, puesto, salario, turno):
        self.cursor.execute(f"SELECT * FROM empleados WHERE dni = {dni}")
        empleado_existe = self.cursor.fetchone()
        if empleado_existe:
            return False
        sql = "INSERT INTO empleados (nombre, apellido, dni, puesto, salario, turno) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = (nombre, apellido, dni,puesto, salario, turno)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True

    def modificar_empleado(self, nuevo_nombre, nuevo_apellido, nuevo_puesto, nuevo_salario, nuevo_turno,dni):
        sql = "UPDATE empleados SET nombre = %s, apellido = %s, puesto = %s, salario = %s, turno = %s WHERE dni = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_puesto, nuevo_salario, nuevo_turno,dni)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def eliminar_empleado(self, dni):
        self.cursor.execute(f"DELETE FROM empleados WHERE dni = {dni}")
        self.conn.commit()
        return self.cursor.rowcount > 0

# Cuerpo del programa
catalogo = Catalogo(host='TizianoLP.mysql.pythonanywhere-services.com', user='TizianoLP', password='CodoaCodo', database='TizianoLP$default')
ruta_destino = './'

@app.route("/empleados", methods=["GET"])
def listar_empleados():
    empleados = catalogo.listar_empleados()
    return jsonify(empleados)

@app.route("/empleados/<int:dni>", methods=["GET"])
def mostrar_empleado(dni):
    empleado = catalogo.consultar_empleado(dni)
    if empleado:
        return jsonify(empleado)
    else:
        return "Empleado no encontrado", 404

@app.route("/empleados", methods=["POST"])
def agregar_empleado():
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    dni = request.form['dni']
    puesto = request.form['puesto']
    salario = request.form['salario']
    turno = request.form['turno']
    if catalogo.agregar_empleado(nombre, apellido, dni, puesto, salario, turno):
        return jsonify({"mensaje": "Empleado agregado"}), 201
    else:
        return jsonify({"mensaje": "El empleado ya existe"}), 400

@app.route("/empleados/<int:dni>", methods=["PUT"])
def modificar_producto(dni):
    nuevo_nombre = request.form.get("nombre")
    nuevo_apellido = request.form.get("apellido")
    nuevo_puesto = request.form.get("puesto")
    nuevo_salario = request.form.get("salario")
    nuevo_turno = request.form.get('turno')
    if catalogo.modificar_empleado(nuevo_nombre, nuevo_apellido, nuevo_puesto, nuevo_salario, nuevo_turno, dni):
        return jsonify({"mensaje": "Empleado modificado"}), 200
    else:
        return jsonify({"mensaje": "Empleado no encontrado"}), 404

@app.route("/empleados/<int:dni>", methods=["DELETE"])
def eliminar_empleado(dni): 
    empleado = catalogo.consultar_empleado(dni)
    if empleado:
        if catalogo.eliminar_empleado(dni):
            return jsonify({"mensaje": "Empleado eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar al empleado"}), 500
    else:
        return jsonify({"mensaje": "Empleado no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)