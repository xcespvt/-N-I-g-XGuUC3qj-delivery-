
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'support';
    timestamp: string;
};

const initialMessages: Message[] = [
    { id: 1, text: 'Hello! How can I help you today?', sender: 'support', timestamp: '10:30 AM' },
    { id: 2, text: 'I have an issue with my recent payout.', sender: 'user', timestamp: '10:31 AM' },
    { id: 3, text: 'I understand. Can you please provide the order ID or transaction details?', sender: 'support', timestamp: '10:32 AM' },
];

const quickReplies = [
    "Customer isn't answering the call.",
    "Restaurant is taking too long.",
    "I have an issue with the delivery address.",
    "My payment for this order is incorrect."
];

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const inputFileRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (text: string) => {
        if (text.trim() === '') return;
        const message: Message = {
            id: messages.length + 1,
            text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, message]);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };
    
    const handleQuickReply = (text: string) => {
        sendMessage(text);
    };

    const handleAttachClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const message: Message = {
                id: messages.length + 1,
                text: `File attached: ${file.name}`,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, message]);
        }
    };
    
    const handleVoiceOrSend = () => {
        if (newMessage.trim()) {
            handleSendMessage();
        } else {
            // Simulate sending a voice message
            const message: Message = {
                id: messages.length + 1,
                text: '🎤 Voice Message (0:05)',
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, message]);
        }
    };

    return (
        <div className="flex h-screen flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border" data-ai-hint="person face">
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Support Agent" />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-base font-semibold">Support Chat</h1>
                            <p className="text-xs text-green-600">Online</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.sender === 'support' && (
                            <Avatar className="h-8 w-8 border shrink-0" data-ai-hint="person face">
                                <AvatarImage src="https://placehold.co/40x40.png" alt="Support Agent" />
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            'max-w-xs md:max-w-md rounded-2xl px-4 py-2.5',
                            msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none border'
                        )}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={cn('text-xs mt-1 text-right', msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="sticky bottom-16 border-t bg-background sm:bottom-0">
                <div className="bg-background/95 p-3">
                    <p className="text-sm font-medium mb-2 text-muted-foreground">Quick Replies</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {quickReplies.map((reply, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="rounded-full flex-shrink-0 bg-white shadow-sm"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="relative flex items-center gap-2 border-t p-2">
                     <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground flex-shrink-0" onClick={handleAttachClick}>
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Attach file</span>
                    </Button>
                    <input
                        ref={inputFileRef}
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                    />
                    <Input
                        placeholder="Type your message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVoiceOrSend()}
                    />
                    <Button size="icon" className="h-9 w-9 flex-shrink-0" onClick={handleVoiceOrSend}>
                        {newMessage.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        <span className="sr-only">{newMessage.trim() ? 'Send' : 'Record voice message'}</span>
                    </Button>
                </div>
            </footer>
        </div>
    );
}
