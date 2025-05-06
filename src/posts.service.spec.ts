import {Post, PostsService} from './posts.service';

describe('PostsService', () => {
    let postsService: PostsService;
    const post: Omit<Post, 'id' | 'date'> = {
        text: 'Mocked post',
    };

    beforeEach(async () => {
        postsService = new PostsService();

        postsService.create({text: 'Some pre-existing post'});
    });

    it('should add a new post', () => {
        const initialLength = postsService['posts'].length;

        const newPost = postsService.create(post);

        expect(postsService['posts'].length).toBe(initialLength + 1);
        expect(newPost.text).toBe(post.text);
        expect(newPost.id).toBeDefined();
        expect(newPost.date).toBeDefined();
    });

    it('should find a post', () => {
        const postToFind = postsService.create(post);
        const foundPost = postsService.find(postToFind.id);

        expect(foundPost).not.toBeNull();
        expect(foundPost?.id).toBe(postToFind.id);
        expect(foundPost?.text).toBe(post.text);
    });
});
