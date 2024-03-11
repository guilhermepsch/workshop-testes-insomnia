import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/autentica.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() { email, senha }: AutenticaDTO) {
    return this.autenticacaoService.login(email, senha);
  }
}
