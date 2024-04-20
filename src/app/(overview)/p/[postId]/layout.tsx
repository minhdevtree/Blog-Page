export default function PostCommentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:px-20">{children}</div>
        </>
    );
}
