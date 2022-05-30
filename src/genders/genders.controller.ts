import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGendersDto } from './dto/CreateGenders.dto';
import { UpdateGendersDto } from './dto/UpdateGenders.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Genders } from '@prisma/client';

@ApiTags('genders')
@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    findAll() {
        return this.gendersService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um gênero pelo ID',
    })    
    findOne(@Param('id') id: string) {
      return this.gendersService.findById(parseInt(id));
    }

    @Post()
    create(@Body() dto: CreateGendersDto) {
        return this.gendersService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
      summary: 'Editar um jogo pelo ID',
    })    
    update(@Param('id') id: string, @Body() dto: UpdateGendersDto): Promise<Genders> {
        return this.gendersService.update( parseInt(id), dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar jogo pelo ID',
    })    
    delete(@Param('id') id: string,): Promise<Genders> {
        return this.gendersService.delete( parseInt(id) );
    }
}
