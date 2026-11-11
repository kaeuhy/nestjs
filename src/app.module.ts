import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoardModule } from './board/board.module';
import { ClassroomController } from './classroom/classroom.controller';
import { ClassroomService } from './classroom/classroom.service';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [BoardModule, ClassroomModule],
  controllers: [AppController, ClassroomController],
  providers: [AppService, ClassroomService],
})
export class AppModule {}
