
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Check, Clock, GraduationCap, Languages, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Icons } from "@/components/icons";
import { courses } from '@/lib/data';
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const StatCard = ({ value, label }: { value: number | string; label: string }) => (
    <div className="flex-1 rounded-lg bg-muted p-3 text-center transition-transform hover:scale-105">
        <p className="text-2xl font-bold text-primary">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
    </div>
);

const AvailableCourseCard = ({ course }: { course: Course }) => {
    const { toast } = useToast();
    const handleEnroll = () => {
        toast({
            title: "Enrollment Successful!",
            description: `You have enrolled in the "${course.title}" course.`,
        });
    };

    return (
        <Card className="transition-all duration-300 cursor-pointer" onClick={handleEnroll}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <course.icon className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-bold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                        </div>
                    </div>
                    {course.isNew && <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">New</Badge>}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Duration: {course.duration}</span>
                </div>
                <Button className="mt-4 w-full">Enroll Now</Button>
            </CardContent>
        </Card>
    );
};

const EnrolledCourseCard = ({ course }: { course: Course }) => {
    const { toast } = useToast();
    const handleContinue = () => {
        toast({
            title: "Resuming Course",
            description: `Continuing with "${course.title}".`,
        });
    };

    return (
        <Card className="transition-all duration-300 cursor-pointer" onClick={handleContinue}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <course.icon className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-bold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                        </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-transparent font-semibold">In Progress</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span className="font-medium">Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                </div>
                <Button className="mt-4 w-full">Continue Learning</Button>
            </CardContent>
        </Card>
    );
};

const CompletedCourseCard = ({ course }: { course: Course }) => {
    const { toast } = useToast();
    const handleViewCertificate = () => {
        toast({
            title: "Loading Certificate",
            description: `Your certificate for "${course.title}" is being prepared.`,
        });
    };

    return (
        <Card className="transition-all duration-300 cursor-pointer" onClick={handleViewCertificate}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <course.icon className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-bold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                        </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-transparent font-semibold">Completed</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
                {course.completedDate && (
                     <div className="mt-3 flex items-center gap-2 text-sm text-green-600 font-medium">
                        <Check className="h-4 w-4" />
                        <span>Completed on {course.completedDate}</span>
                    </div>
                )}
                <Button variant="outline" className="mt-4 w-full">View Certificate</Button>
            </CardContent>
        </Card>
    );
};

const CourseSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h2 className="text-lg font-semibold mb-3 px-1">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

export default function EducationalCoursesPage() {
    const router = useRouter();

    const availableCourses = courses.filter(c => c.status === 'Available');
    const enrolledCourses = courses.filter(c => c.status === 'InProgress');
    const completedCourses = courses.filter(c => c.status === 'Completed');

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Icons.logo className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-lg font-semibold">Educational Courses</h1>
                <div className="w-7" />
            </header>

            <main className="flex-1 space-y-6 p-4">
                <Button variant="ghost" onClick={() => router.back()} className="mb-[-1rem] px-0 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>

                <Card className="bg-primary text-primary-foreground transition-all duration-300">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Free Educational Courses</h2>
                        </div>
                        <p className="mt-1 text-sm text-primary-foreground/80">
                            Upgrade your skills while you earn
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-all duration-300">
                    <CardContent className="p-4">
                         <p className="text-sm text-muted-foreground mb-4">
                            Crevings offers free courses to help you grow professionally and personally. Enroll now and learn at your own pace!
                        </p>
                        <div className="flex gap-4">
                            <StatCard value={availableCourses.length} label="Available Courses" />
                            <StatCard value={completedCourses.length} label="Completed" />
                        </div>
                    </CardContent>
                </Card>

                <CourseSection title="Available Courses">
                    {availableCourses.map(course => <AvailableCourseCard key={course.id} course={course} />)}
                </CourseSection>

                <CourseSection title="Your Enrolled Courses">
                    {enrolledCourses.map(course => <EnrolledCourseCard key={course.id} course={course} />)}
                </CourseSection>

                <CourseSection title="Completed Courses">
                    {completedCourses.map(course => <CompletedCourseCard key={course.id} course={course} />)}
                </CourseSection>
                
                 <Card className="bg-primary/5 border-primary/20 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-primary/90">"Knowledge is the only thing that <span className="font-bold">grows</span> when you share it. Learn, earn, and return!"</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
