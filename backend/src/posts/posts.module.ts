import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post, Rent } from '../shared/models';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [SequelizeModule.forFeature([Post, Rent]), CloudinaryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
