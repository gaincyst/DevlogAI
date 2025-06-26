import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Authentication } from './auth/user.entity';
import { JournalModule } from './journal/journal.module';
import { JournalEntry } from './journal/journal.entity';
import { SummarizeModule } from './summarize/summarize.module';
import { AutotagModule } from './autotag/autotag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [Authentication, JournalEntry],
      synchronize: true,
    }),
    AuthModule,
    JournalModule,
    SummarizeModule,
    AutotagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
