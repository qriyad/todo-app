import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskDto } from "./task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
    
    @Get()
    async findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Post()
    async create(@Body() taskDto: TaskDto): Promise<Task> {
        return this.tasksService.create(taskDto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() taskDto: TaskDto): Promise<Task> {
        const task = await this.tasksService.update(id, taskDto);
        if (!task) {
            throw new NotFoundException('Task not found');
        } else {
            return task;
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        const task = await this.tasksService.delete(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        } else {
            return task;
        }
    }
}