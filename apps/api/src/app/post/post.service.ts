import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { PostCategory } from '../post-category/entities/post-category.entity';
import { User } from '../user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>
  ) {}

  async getPostById(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new HttpException('Post Not found', HttpStatus.NOT_FOUND);
    return post;
  }

  async create(createPostDto: CreatePostDto, authorId: number) {
    const categoriesIds = createPostDto.categories;
    const author = await this.userRepository.findOneBy({
      id: authorId,
    });
    if (!author)
      throw new HttpException('User Not found', HttpStatus.BAD_REQUEST);
    const categories = await this.postCategoryRepository.find({
      where: { id: In(categoriesIds) },
    });

    const newPost = {
      ...createPostDto,
      author: author,
      categories,
    };
    return await this.postRepository.save(newPost);
  }

  async findAll(searchedTerm: string, postFilter: string, categoryFilter: string) {
    let query = this.postRepository.createQueryBuilder('post')
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.categories', 'categories');
    console.log(searchedTerm, postFilter, categoryFilter);
    if (searchedTerm) {
      query = query.where('post.title LIKE :searchedTerm OR post.description LIKE :searchedTerm', { searchedTerm: `%${searchedTerm}%` });
    }
    if (categoryFilter) {
      query = query.andWhere('EXISTS (SELECT 1 FROM post.categories category WHERE category.name LIKE :categoryFilter)', { categoryFilter: `%${categoryFilter}%` });
    }
    
    const posts = await query.getMany();
    posts.map((post) => {
      post.hasTopAnswer = post.getHasTopAnswer();
      post.answersAmount = post.getAnswersAmount();
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'categories'],
    });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    post.hasTopAnswer = post.getHasTopAnswer();
    post.answersAmount = post.getAnswersAmount();
    return post;
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
