'use strict'

const db = require('APP/db');
const User = require('APP/db/models/user');
const chai = require('chai');
const Bluebird = require('bluebird');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const supertest = require('supertest-as-promised');
const sinon = require('sinon');

describe('User', () => {
	before('wait for the db', function(done){
		db.didSync
			.then(() => {
				Bluebird.all([
					User.create({
						first_name: 'barack',
						last_name: 'obama',
						email: 'beth@secrets.org',
						password: '12345'
					}),
					User.create({
						first_name: 'Hillary',
						last_name: 'Clinton',
						email: 'clinton@secrets.org',
						password: '54321'
					}),
					User.create({
						first_name: 'Donald',
						last_name: 'Trump',
						email: 'trump@secrets.org',
						password: 'abcde'
					})
				])
				.then(() => done())
				.catch(done);
		})
	});
 	
 	after('clear db', () => db.didSync)

	describe('authenticate(plaintext: String) ~> Boolean', () => {

		it('resolves true if the password matches', () =>
			User.findOne({where: {email: "trump@secrets.org"}})
				.then(user => user.authenticate('abcde'))
				.then(result => expect(result).to.be.true))

		it("resolves false if the password doesn't match", () =>
			User.findOne({where: {email: "trump@secrets.org"}})
				.then(user => user.authenticate('not ok'))
				.then(result => expect(result).to.be.false))
	})

	describe('throw an error for invalidated data', () => {

		it('when first name is empty', () => {
			const user = User.build({
				first_name: null,
				last_name: 'Trump',
				email: 'test@secrets.org',
				password: 'abcde'
			})

			return user.validate()
				.then(err=> {
				expect(err).to.be.an('object');
				expect(err.errors).to.contain.a.thing.with.properties({
            path: 'first_name',
            type: 'notNull Violation'
        });
			})
		})
			

		// it("when email is duplicated", () => {
		// 	const user = User.build({
		// 		first_name: 'name',
		// 		last_name: 'random',
		// 		email: 'trump@secrets.org',
		// 		password: 'abcde'
		// 	})

		// 	return user.validate()
		// 		.then(err=> {
		// 		expect(err).to.be.an('object');
		// 		expect(err.errors).to.contain.a.thing.with.properties({
  //           path: 'email',
  //           type: 'unique Violation'
  //       });
		// 	})
		// })
	})
})



/*
describe('Task', function () {

	//clear the database before all tests
	before(function () {
		return db.sync({force: true});
	});

	// erase all tasks after each spec
	afterEach(function(){
		return db.sync({force: true});
	});

	describe('Virtual getters', function() {

		describe('timeRemaining', function() {

			it('returns the Infinity value if task has no due date', function() {
				var task = Task.build();
				expect(task.timeRemaining).to.equal(Infinity);
			});

			it('returns the difference between due date and now', function() {
				var oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds

				// create a task due one day from this point in time
				var task = Task.build({
					due: helper.dates.tomorrow()
				});

				expect(task.timeRemaining).to.be.closeTo(oneDay, 10); // within 10 ms
			});

		});

		describe('overdue', function() {

			it('is overdue if the due date is in the past', function() {
				var task = Task.build({
					due: helper.dates.yesterday()
				});
				expect(task.overdue).to.be.true;
			});

			it('is not overdue if the due date is in the past but complete is true', function() {
				var task = Task.build({
					due: helper.dates.yesterday(),
					complete: true
				});
				expect(task.overdue).to.be.false;
			});

			it('is not overdue if the due date is in the future', function() {
				var task = Task.build({
					due: helper.dates.tomorrow()
				});
				expect(task.overdue).to.be.false;
			});
		});
	});

	describe('Class methods', function(){

		beforeEach(function(){
			return Bluebird.all([
				Task.create({ name: 't1', due: helper.dates.tomorrow() }),
				Task.create({ name: 't2', due: helper.dates.tomorrow(), complete: true }),
				Task.create({ name: 't3', due: helper.dates.yesterday() }),
				Task.create({ name: 't4', due: helper.dates.yesterday(), complete: true })
			]);
		});

		describe('clearCompleted', function(){
			it('removes all completed tasks from the database', function(){
				return Task.clearCompleted()
					.then(function() {
						return Task.findAll({ where: { complete: true } });
					})
					.then(function(completedTasks) {
						expect(completedTasks.length).to.equal(0);
						return Task.findAll({ where: { complete: false } });
					})
					.then(function(incompleteTasks) {
						expect(incompleteTasks.length).to.equal(2);
					});
			});

		});

		describe('completeAll', function(){

			it('marks all incomplete tasks as completed', function(){
				return Task.completeAll()
					.then(function() {
						return Task.findAll({ where: { complete: false } });
					})
					.then(function(incompleteTasks) {
						expect(incompleteTasks.length).to.equal(0);
						return Task.findAll({ where: { complete: true } });
					})
					.then(function(completeTasks) {
						expect(completeTasks.length).to.equal(4);
					});
			});

		});

	});

	describe('Instance methods', function() {

		var task;

		beforeEach(function() {
			return Task.create({
				name: 'task'
			})
			.then(function(_task){
				task = _task;
			});
		});

		describe('addChild', function() {

			it('should return a promise for the new child', function() {
				return task.addChild({ name: 'task2' })
				.then(function(child) {
					expect(child.name).to.equal('task2');
					expect(child.parentId).to.equal(task.id);
				});
			});

		});

		describe('getChildren', function() {

			beforeEach(function() {
				return task.addChild({ name: 'foo' });
			});

			it('should return a promise for an array of the task\'s children', function() {
				return task.getChildren()
				.then(function(children) {
					expect(children).to.have.length(1);
					expect(children[0].name).to.equal('foo');
				});
			});

		});

		describe('getSiblings', function() {

			var childrenReferences = [];

			var childBuilder = function() {
				return task.addChild({ name: 'foo' })
				.then(function(child) {
					childrenReferences.push(child);
				});
			};

			//build two children
			beforeEach(childBuilder);
			beforeEach(childBuilder);

			it('returns a promise for an array of siblings', function() {
				return childrenReferences[0].getSiblings()
				.then(function(siblings) {
					expect(siblings).to.have.length(1);
					expect(siblings[0].id).to.equal(childrenReferences[1].id);
				});
			});

		});

	});


	describe('a `pre` destroy hook', function(){

		var studyTask;
		beforeEach(function(){
			// make a parent `study` task
			studyTask = Task.build({ name: 'study', due: helper.dates.yesterday() });
			return studyTask.save()
				.then(function(study){
					// make two child tasks (`sql` and `express`) and two unrelated tasks
					return Bluebird.all([
						Task.create({
							parentId: study.id,
							name: 'sql',
							due: helper.dates.yesterday(),
							complete: true
						}),
						Task.create({
							parentId: study.id,
							name: 'express',
							due: helper.dates.tomorrow()
						}),
						Task.create({ name: 'sleep' }),
						Task.create({ name: 'eat' })
					]);
				});
		});

		describe('removal', function(){

			it('also removes all child tasks', function(){
				return studyTask.destroy()
				.then(function(){
					return Task.findAll();
				})
				.then(function(tasks){
					expect(tasks).to.have.length(2);
					tasks.sort(function byName (t0, t1) {
						return t0.name > t1.name;
					});
					expect(tasks[0].name).to.equal('eat');
					expect(tasks[1].name).to.equal('sleep');
				});
			});

		});

	});

});

*/
