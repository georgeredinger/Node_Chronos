#Get acceleration data from Chronos watch.
#Taken from info posted at: http://e2e.ti.com/support/microcontrollers/msp43016-bit_ultra-low_power_mcus/f/166/t/32714.aspx
#
#FIXED: In old version I had the x and z value switched around.
#
#CMA3000-D01 accelerometer
#7 bits + sign
#
#If you want you may contact me at seabre986@gmail.com
#or on reddit: seabre
#
import serial
import array
import time
import sys

def startAccessPoint():
    return array.array('B', [0xFF, 0x07, 0x03]).tostring()
 
def accDataRequest():
    return array.array('B', [0xFF, 0x08, 0x07, 0x00, 0x00, 0x00, 0x00]).tostring()
 

ser = serial.Serial("/dev/ttyACM0",115200,timeout=1)

 
#Start access point
ser.write(startAccessPoint())
 
 

def signedByte(b):
    if b > 127:
          b -= 256
    return b 
 
while True:
    #Send request for acceleration data
    time.sleep(.1);
    ser.write(accDataRequest())
    accel = ser.read(7)
    if(len(accel)>3):
       if ord(accel[0]) != 0 and ord(accel[1]) != 0 and ord(accel[2]) != 0:
          print "{\"x\":" + str(signedByte(ord(accel[0]))) + ",\"y\":" + str(signedByte(ord(accel[1]))) + ",\"z\":" + str(signedByte(ord(accel[2])))+"}"
          sys.stdout.flush()

ser.close()
