import { useMasterData } from '../contexts/master-data';
import PostActions from './PostActions';

const Post = () => {
    const { isFetching, loaded, reactionsById, usersById } = useMasterData();
    if (isFetching || !loaded) {
        return <div>Loading master data...</div>;
    }
    return <PostActions reactionsById={reactionsById} usersById={usersById} />;
};

export default Post;
