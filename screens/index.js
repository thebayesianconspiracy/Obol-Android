import Home from './Home';
import React, { Component } from 'react';
import Device from './Device';
import SetupDevice from './SetupDevice';

import {
    View,
    Text,
} from 'react-native';

export const HomeRoute = {
    name: 'Home',
    component: Home,
};

export const DeviceRoute = {
    name: 'Device',
    component: Device,
};

export const SetupDeviceRoute = {
    name: 'Setup Device',
    component: SetupDevice,
};
