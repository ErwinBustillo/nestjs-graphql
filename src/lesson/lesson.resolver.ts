import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { StudentService } from './../student/student.service';
import { Resolver,Query, Mutation, Args, ResolveField, Parent} from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';

@Resolver(() => LessonType)
export class LessonResolver {

  constructor(
    private lessonService:LessonService,
    private studentService:StudentService
  ){}

  @Query(() => LessonType)
  lesson(
    @Args('id') id:string
  ){
    return this.lessonService.getLesson(id);
  }

  @Query(()=> [LessonType])
  lessons(){
    return this.lessonService.getAllLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput:CreateLessonInput,
  ){
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(()=> LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput:AssignStudentsToLessonInput
  ){
    const {lessonId, studentIds} = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId,studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson:Lesson) {
     return this.studentService.getManyStudents(lesson.students);
  }
}