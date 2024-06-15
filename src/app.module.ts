import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}