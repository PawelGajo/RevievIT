import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { PostCategory } from './post-category/entities/post-category.entity';
import { Answer } from './post/entities/answer.entity';
import { ReviewedCategory } from './post/entities/reviewed-category.entity';
import { ReviewedCategoryNode } from './post/entities/reviewed-category-node.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'reviewit',
      entities: [
        User,
        Post,
        PostCategory,
        Answer,
        ReviewedCategory,
        ReviewedCategoryNode,
      ],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    PostCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
