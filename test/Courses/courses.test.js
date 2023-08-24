import chai from 'chai';
import CourseServiceDao from '../../src/services/db/dao/courses.dao.js';

const expect = chai.expect;

const CoursesDao = new CourseServiceDao();

describe("Testing Courses Api", () => {

    let courseID;

    it('should save a course', async () => {
        let course = {
            title: "Test course",
            description: "Test description",
            teacherName: "Test teacher",
            students: []
        }
        let result = await CoursesDao.saveCourse(course).then((result) => {
            done();
            return result;
        });
        expect(result).to.be.an('object');
    });

    it('should return course by id', async () => {
        let courses = await CoursesDao.getById(courseID);
        expect(courses).to.be.an('array');
        done();
    });

    it('should update a course', async () => {
        let course = {
            title: "Test course ACTUALZIADO",
            description: "Test description",
            teacherName: "Test teacher",
            students: []
        }
        let result = await CoursesDao.updateCourse(courseID, course);
        courseID = result.id
        expect(result).to.be.an('object');
    });

    it('should return all courses', async () => {
        let courses = await CoursesDao.getAll();
        expect(courses).to.be.an('array');
    });
});