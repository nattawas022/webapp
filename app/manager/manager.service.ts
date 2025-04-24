// src/manager/manager.service.ts
import { Injectable } from '@nestjs/common';
import { ManagerLoginDto } from './dto/login.dto';
import { ManagerRegisterDto } from './dto/register.dto';

@Injectable()
export class ManagerService {
  async register(registerDto: ManagerRegisterDto) {
    // ตรวจสอบและบันทึกข้อมูล manager ที่ลงทะเบียน
    return { message: 'Registration successful' };
  }

  async login(loginDto: ManagerLoginDto) {
    // ตรวจสอบการเข้าสู่ระบบ
    return { message: 'Login successful' };
  }
}