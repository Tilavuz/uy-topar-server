import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/uy-topar'),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
