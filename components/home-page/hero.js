import Image from 'next/image';

import classes from './hero.module.css';

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src='/images/site/terminator.jpg'
                    alt='An image showing terminator'
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm T-800</h1>
            <p>I kill humans</p>
        </section>
    );
}