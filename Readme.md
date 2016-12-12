# Obol

Repository for the Android app for Obol. Uses the mqtt protocol to communicate with surrounding iot devices.

### Features
1. Allows you to initialzie an Obol sensor with initial amount, category (food or medicine) and quantity.
2. Processes a stream of weight data from multiple sensors, smoothes it to determine changes in quantity and updates them.
3. Demo notifications which remind user to take medicines.
4. In case of food, updates the amount of calories that you consume.