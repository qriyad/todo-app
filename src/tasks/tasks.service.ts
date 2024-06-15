import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskDto } from "./task.dto";

@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException('Task not found');
        } else return task;
    }

    async create(taskDto: TaskDto): Promise<Task> {
        const task = await this.taskRepository.create(taskDto);
        return await this.taskRepository.save(task);
    }

    async update(id: number, taskDto: TaskDto): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException('Task not found');
        } else {
            this.taskRepository.merge(task, taskDto);
            return await this.taskRepository.save(task);
        }
    }

    async delete(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException('Task not found');
        } else {
            await this.taskRepository.remove(task);
            return task;
        }
    }
}