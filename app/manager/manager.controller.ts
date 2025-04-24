// src/manager/manager.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerLoginDto } from './dto/login.dto';
import { ManagerRegisterDto } from './dto/register.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('register')
  async register(@Body() registerDto: ManagerRegisterDto) {
    return this.managerService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: ManagerLoginDto) {
    return this.managerService.login(loginDto);
  }
}