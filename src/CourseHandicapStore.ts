import { makeAutoObservable } from 'mobx'
export class CourseHandicapStore {
    constructor() {
        makeAutoObservable(this)
    }

    handicapIndex = -10
    slopeRating = 55
    courseRating = 21
    par = 27
    flag = '9'

    setFlag(flag: string) {
        this.flag = flag
    }

    setHandicapIndex(handicapIndex: number) {
        this.handicapIndex = handicapIndex
    }

    setSlopeRating(slopeRating: number) {
        this.slopeRating = slopeRating
    }

    setCourseRating(courseRating: number) {
        this.courseRating = courseRating
    }

    setPar(par: number) {
        this.par = par
    }

    getFlag() {
        return this.flag;
    }

    getData() {
        const data: { [key: string]: number } = {}

        data['handicap_index']  = this.handicapIndex
        data['slope_rating'] = this.slopeRating
        data['course_rating'] = this.courseRating
        data.par = this.par

        return data
    }
}

export const courseHandicapStore = new CourseHandicapStore()