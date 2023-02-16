import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/utils';

@Controller('admin/servicos')
export class ServicosController {
  constructor(
    private readonly servicosService: ServicosService,
    private readonly utils: Utils,
    @InjectRepository(Servico)
    private readonly servicosRepository: Repository<Servico>,
  ) {}

  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadastrar() {
    //
  }

  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    const servicos = await this.servicosRepository.find();
    return { servicos: servicos };
  }

  @Post()
  @Redirect('/admin/servicos/index')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    createServicoDto.valorBanheiro = this.utils.formatDecimal(
      createServicoDto.valorBanheiro,
    );

    createServicoDto.valorCozinha = this.utils.formatDecimal(
      createServicoDto.valorCozinha,
    );

    createServicoDto.valorMinimo = this.utils.formatDecimal(
      createServicoDto.valorMinimo,
    );

    createServicoDto.valorOutros = this.utils.formatDecimal(
      createServicoDto.valorOutros,
    );

    createServicoDto.valorSala = this.utils.formatDecimal(
      createServicoDto.valorSala,
    );

    createServicoDto.valorQuarto = this.utils.formatDecimal(
      createServicoDto.valorQuintal,
    );

    createServicoDto.valorQuintal = this.utils.formatDecimal(
      createServicoDto.valorQuintal,
    );

    return await this.servicosRepository.save(createServicoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(+id);
  }

  @Get(':id/edit')
  @Render('servicos/editar')
  async atualizarServico(@Param('id') id: number) {
    const servico = await this.servicosRepository.findOneBy({ id: id });
    return { servico: servico };
  }

  @Patch(':id/edit')
  @Redirect('/admin/servicos/index')
  async update(
    @Param('id') id: string,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    updateServicoDto.valorBanheiro = this.utils.formatDecimal(
      updateServicoDto.valorBanheiro,
    );

    updateServicoDto.valorCozinha = this.utils.formatDecimal(
      updateServicoDto.valorCozinha,
    );

    updateServicoDto.valorMinimo = this.utils.formatDecimal(
      updateServicoDto.valorMinimo,
    );

    updateServicoDto.valorOutros = this.utils.formatDecimal(
      updateServicoDto.valorOutros,
    );

    updateServicoDto.valorSala = this.utils.formatDecimal(
      updateServicoDto.valorSala,
    );

    updateServicoDto.valorQuarto = this.utils.formatDecimal(
      updateServicoDto.valorQuintal,
    );

    updateServicoDto.valorQuintal = this.utils.formatDecimal(
      updateServicoDto.valorQuintal,
    );
    return await this.servicosRepository.update(id, updateServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  }
}
