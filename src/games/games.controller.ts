import { Controller, Get, Post, Patch, Delete, Body, Param, UnauthorizedException } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGamesDto } from './dto/CreateGames.dto';
import { UpdateGamesDto } from './dto/UpdateGames.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Games } from '@prisma/client';
import { UserLoggedIsAdim } from '../utils/users-utils';

@ApiTags('games')
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    @ApiOperation({
        summary: 'Localizar todos jogos',
    })    
    findAll() {
      /*
      if( ! UserLoggedIsAdim() ) {
        throw new UnauthorizedException(`Usuario logado não esta cadastrado como administrador`)
      }*/
      return this.gamesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um jogo pelo ID',
    })    
    findById(@Param('id') id: string) {
      return this.gamesService.findById(parseInt(id));
    }

    @Post()
    @ApiOperation({
        summary: 'Adicionar um jogo',
      })    
      create(@Body() dto: CreateGamesDto) {
        return this.gamesService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo pelo ID',
      })    
      update(@Param('id') id: string, @Body() dto: UpdateGamesDto): Promise<Games> {
        return this.gamesService.update( parseInt(id), dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar jogo pelo ID',
    })    
    delete(@Param('id') id: string,): Promise<Games> {
        return this.gamesService.delete( parseInt(id) );
    }
}
