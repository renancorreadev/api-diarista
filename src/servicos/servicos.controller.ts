import { CreateException } from './../common/filters/create-exception.filter';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
  Request,
  UseFilters,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';

@Controller('admin/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadastrar(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }
  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    return { servicos: await this.servicosService.findAll() };
  }

  @Post()
  @UseFilters(CreateException)
  @Redirect('/admin/servicos/index')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    return await this.servicosService.create(createServicoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(+id);
  }

  @Get(':id/edit')
  @Render('servicos/editar')
  async atualizarServico(@Param('id') id: number, @Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
      servico: await this.servicosService.findOne(id),
    };
  }

  @Patch(':id/edit')
  @UseFilters(PatchException)
  @Redirect('/admin/servicos/index')
  async update(
    @Param('id') id: number,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return await this.servicosService.update(id, updateServicoDto);
  }
}
